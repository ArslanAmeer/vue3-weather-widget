// module.exports = {
//   presets: [
//     '@vue/cli-plugin-babel/preset'
//   ]
// }

module.exports = {
    env: {
        test: {
            presets: [
                [
                    "@babel/preset-env",
                    {
                        targets: {
                            node: "current",
                        },
                    },
                ],
            ],
        },
    },
};
