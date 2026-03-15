module.exports = {
  presets: [
    ["@babel/preset-env", { targets: { node: "current" } }],
    ["@babel/preset-react", { runtime: "automatic" }], // JSX 이해
    "@babel/preset-typescript", // TS 이해
  ],
};
