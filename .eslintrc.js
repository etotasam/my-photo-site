module.exports = {
  extends: [
    "react-app",
    "react-app/jest",
    "next/core-web-vitals"
  ],
  rules: {
    "react-hooks/exhaustive-deps": "off"
  },
  overrides: [
    {
      files: ["**/*.ts?(x)"],
      rules: {
        "additional-typescript-only-rule": "warn"
      }
    }
  ]
}