(() => {
  const CONTEXT_VERSION = "vote4gov-context-v1";
  const CANONICAL_EDEBATTE_ORIGIN = "https://www.edebatte.org";
  const PREPARING_MESSAGE = "Der Themenkontext bei eDebatte wird vorbereitet.";
  const STABLE_ID_PATTERN = /^[A-Za-z0-9][A-Za-z0-9._:-]{0,95}$/;
  const TOPIC_SLUG_PATTERN = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

  // Release values remain empty until Issue #564 confirms them. This is the
  // only article configuration that may activate the public topic handoff.
  const ARTICLE_RELEASES = Object.freeze({
    "history-democracy": Object.freeze({
      articleId: "history-democracy",
      issue: "01",
      topicSlug: "",
      sourceUrl: "",
      questions: Object.freeze([
        Object.freeze({ slot: "thesis", kind: "binary_thesis", questionId: "" }),
        Object.freeze({ slot: "deeper-question", kind: "open_question", questionId: "" }),
      ]),
    }),
  });

  const isCanonicalHttpsUrl = (value) => {
    if (typeof value !== "string" || !value) return false;
    try {
      const url = new URL(value);
      return url.protocol === "https:" && !url.username && !url.password && Boolean(url.hostname);
    } catch {
      return false;
    }
  };

  const encodeBase64Url = (value) => {
    try {
      const bytes = new TextEncoder().encode(JSON.stringify(value));
      let binary = "";
      bytes.forEach((byte) => { binary += String.fromCharCode(byte); });
      return btoa(binary).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/g, "");
    } catch {
      return "";
    }
  };

  const validateRelease = (release) => {
    const missing = [];
    if (!release || release.articleId !== "history-democracy") missing.push("articleId");
    if (release?.issue !== "01") missing.push("issue");
    if (!TOPIC_SLUG_PATTERN.test(release?.topicSlug || "")) missing.push("topicSlug");
    if (!isCanonicalHttpsUrl(release?.sourceUrl)) missing.push("sourceUrl");

    const questions = Array.isArray(release?.questions) ? release.questions : [];
    const binary = questions.filter((question) => question?.kind === "binary_thesis");
    const open = questions.filter((question) => question?.kind === "open_question");
    if (binary.length !== 1 || !STABLE_ID_PATTERN.test(binary[0]?.questionId || "")) {
      missing.push("binaryQuestionId");
    }
    if (open.length !== 1 || !STABLE_ID_PATTERN.test(open[0]?.questionId || "")) {
      missing.push("openQuestionId");
    }
    const ids = questions.map((question) => question?.questionId).filter(Boolean);
    if (new Set(ids).size !== ids.length) missing.push("uniqueQuestionIds");
    return { ok: missing.length === 0, missing };
  };

  const normalizeLocale = (value) => {
    const locale = String(value || "de").slice(0, 24);
    return /^[A-Za-z]{2,3}(?:-[A-Za-z0-9]{2,8})*$/.test(locale) ? locale : "de";
  };

  const getArticleHandoff = ({ articleId, locale } = {}) => {
    const release = ARTICLE_RELEASES[articleId];
    const validation = validateRelease(release);
    if (!validation.ok) {
      return Object.freeze({
        ok: false,
        status: "preparing",
        message: PREPARING_MESSAGE,
        missing: Object.freeze([...validation.missing]),
      });
    }

    const bundle = {
      version: CONTEXT_VERSION,
      source: "vote4gov",
      articleId: release.articleId,
      issue: release.issue,
      sourceUrl: release.sourceUrl,
      locale: normalizeLocale(locale),
      // Browser prompts and local choices are intentionally not canonicalized
      // or transmitted. eDebatte resolves IDs, types and texts server-side.
      questions: release.questions.map((question) => ({ questionId: question.questionId })),
    };
    const encoded = encodeBase64Url(bundle);
    if (!encoded) {
      return Object.freeze({ ok: false, status: "preparing", message: PREPARING_MESSAGE, missing: Object.freeze(["encoding"]) });
    }

    const target = new URL(`/topic/${release.topicSlug}`, CANONICAL_EDEBATTE_ORIGIN);
    target.searchParams.set("v4g", encoded);
    return Object.freeze({ ok: true, status: "ready", url: target.toString(), bundle: Object.freeze(bundle) });
  };

  globalThis.Vote4GovHandoff = Object.freeze({
    CONTEXT_VERSION,
    CANONICAL_EDEBATTE_ORIGIN,
    PREPARING_MESSAGE,
    ARTICLE_RELEASES,
    getArticleHandoff,
  });
})();
