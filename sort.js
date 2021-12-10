// import fs from "fs/promises";
// import path from "path";

// const DIST = "dist";

// const copyFile = async (file) => {
//   const nameTargetDir = path.extname(file.name); // .jpg
//   const targetDir = path.join(DIST, nameTargetDir);
//   try {
//     await fs.mkdir(targetDir, { recursive: true });
//     await fs.copyFile(file.path, targetDir, file.name);
//   } catch (error) {
//     console.error(error);
//     process.exit(1);
//   }
// };

// const readFolder = async (base) => {
//   const files = await fs.readdir(base);
//   for (const item of files) {
//     const localBase = path.join(base, item);
//     const state = await fs.stat(localBase);
//     if (state.isFile()) {
//       await copyFile({ name: item, path: localBase });
//     } else {
//       await readFolder(localBase);
//     }
//   }
// };
// readFolder("./picture");

import fs from "fs/promises";
import path from "path";

class SortFiles {
  #dist;
  constructor(dist) {
    this.#dist = dist;
  }

  async #copyFile(file) {
    const nameTargetDir = path.extname(file.name); // .jpg
    const targetDir = path.join(DIST, nameTargetDir);
    try {
      await fs.mkdir(targetDir, { recursive: true });
      await fs.copyFile(file.path, targetDir, file.name);
    } catch (error) {
      console.error(error);
      process.exit(1);
    }
  }

  async readFolder(base) {
    const files = await fs.readdir(base);
    for (const item of files) {
      const localBase = path.join(base, item);
      const state = await fs.stat(localBase);
      if (state.isFile()) {
        await this.#copyFile({ name: item, path: localBase });
      } else {
        await readFolder(localBase);
      }
    }
  }
}

export default SortFiles;
