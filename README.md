# HTML5 Template (lite)
This is starter template for HTML development.
It includes Sass/SCSS, JS, HTML compilers and image convertors. 

### How to use: 
All output files already are compressed, prefixed, minified and renamed.
1. Your work folder - **`./app`**.
2. `app` folder contains raw files that converts and outputs to `build` folder, so you should be careful when type paths to the files;
> it means that output files saves to `build` folder and all paths to files (images, scripts, styles) that yout type in raw files should be written like if you are in `build` folder. 
3. Gulp's tasks are in `gulp` folder. I decided to split up tasks to several files. If you want change tasks - go to the folder.
4. There are 5 initial tasks: 
  * `scripts`, 
  * `styles`, 
  * `html`, 
  * `server`,
  * `images`.
5. `server` task works with `build` folder.
6. Task `scripts` consists of 2 tasks: 
* `scripts-libs` **for libraries**, that contains in `app/scripts/libs` folder where you can put your .js libraries, that compiles your custom js to `build/scripts/libs.min.js`
* `scripts-main` that compiles your **custom** .js to `build/scripts/scripts.min.js`.
7. Task `style` converts Sass/SCSS file `style.{scss, sass}` to `build/styles/style.min.css`. 
8. Task `images` starts up **after** all necessary files are putted into `./build/images/` folder. This task consists of several sub-tasks:
- `tiny` task compress **all** image .png/.jpg/.jpeg types and moves them to `./build/images/`;
- `webp` task converts to **.webp** format all files in `./build/images/` and puts them into the same folder;
- `sprite` task works with `sp-*.svg` files in `./app/images/sprite` folder and compiles them into one file - `sprite.svg` and puts it in `./build/images/`;
- `svg:remove` task simply replace all non-`sp-*.svg` files to the `./build/images/`;
> if you once done `images` task, you don't need to repeat it.

### How to use **`sprite.svg`**? 
Just put this code in your **.html** file:
`<svg class="YOUR_CLASS"> <use xlink:href="images/sprite.svg#sp-YOUR_ID"></use> </svg>`

### StyleLint
I included StyleLint and its' plugins for better code accuracy and unified style guide. Plugins that were used:
`stylelint`, `stylelint-config-htmlacademy`, `stylelint-config-rational-order`, `stylelint-order`.
To use Linter you should write: 
- `npm run style:lint` to see the necessary changes according to Linter's config 
- `npm run style:fix` to fix the issues.

Well, thats all. Enjoy! :D