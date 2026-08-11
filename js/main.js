// Entry point. Flips the no-js/js hook as early as possible; navigation.js,
// motion.js, and quote.js are self-contained and wire themselves up on load
// when included on a given page — this file has no dependency on them.

document.documentElement.classList.remove('no-js');
document.documentElement.classList.add('js');
