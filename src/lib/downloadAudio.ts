// src/lib/downloadAudio.ts

/**
 * Triggers a download of an MP3 file from a given URL.
 * @param url - The URL to download the MP3 from.
 */
export const downloadAudio = async (url: string): Promise<void> => {
  if (!url) return;

  const endpoint: string = import.meta.env.VITE_DOWNLOAD_ENDPOINT || 'http://ytdl:3000/download';
  try {
      const response: Response = await fetch(`${endpoint}?url=${encodeURIComponent(url)}`, {
          method: 'GET',
      });

      if (response.ok) {
          const blob: Blob = await response.blob();
          const downloadUrl: string = window.URL.createObjectURL(blob);
          const a: HTMLAnchorElement = document.createElement('a');
          a.href = downloadUrl;
          a.download = 'download.mp3'; // Consider generating a more descriptive name
          document.body.appendChild(a);
          a.click();
          window.URL.revokeObjectURL(downloadUrl);
      } else {
          alert('Failed to download audio'); // Consider using a more sophisticated error handling approach
      }
  } catch (error) {
      console.error('Error downloading audio:', error);
      alert('An error occurred while downloading the audio');
  }
};
