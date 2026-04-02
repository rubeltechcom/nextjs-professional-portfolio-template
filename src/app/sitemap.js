import fs from 'fs';
import path from 'path';

export const dynamic = 'force-static';

export default function sitemap() {
  const baseUrl = 'https://rubeltech.com';
  const appDirectory = path.join(process.cwd(), 'src/app');

  // Function to get directories that contain a page file
  const getRoutes = (dir) => {
    try {
      const folders = fs.readdirSync(dir, { withFileTypes: true })
        .filter((dirent) => dirent.isDirectory())
        .map((dirent) => dirent.name);

      return folders.filter((folder) => {
        const folderPath = path.join(dir, folder);
        // Exclude special Next.js folders like api or internal ones if they exist
        if (folder.startsWith('_') || folder.startsWith('(')) return false;
        
        return fs.readdirSync(folderPath).some((file) => file.startsWith('page.'));
      });
    } catch (error) {
      console.error("Error reading app directory for sitemap:", error);
      return [];
    }
  };

  const dynamicFolders = getRoutes(appDirectory);

  const routes = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    ...dynamicFolders.map((folder) => ({
      url: `${baseUrl}/${folder}`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    })),
  ];

  return routes;
}
