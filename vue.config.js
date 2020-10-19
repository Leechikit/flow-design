/*
 * @Description: 
 * @Autor: Lizijie
 * @Date: 2020-10-19 17:19:50
 * @LastEditors: Lizijie
 * @LastEditTime: 2020-10-19 17:19:55
 */
module.exports = {
  lintOnSave: false,
  css: {
    loaderOptions: {
      // pass options to sass-loader
      sass: {
        // @/ is an alias to src/
        // so this assumes you have a file named `src/variables.scss`
        prependData: `@import "@/assets/theme/_variables.scss";`
      }
    }
  }
}
