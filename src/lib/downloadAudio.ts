// src/lib/downloadAudio.ts

/**
 * Triggers a download of an MP3 file from a given URL.
 * @param url - The URL to download the MP3 from.
 */
export const downloadAudio = async (url: string): Promise<void> => {
  if (!url) return;

  const endpoint: string = import.meta.env.VITE_DOWNLOAD_ENDPOINT || 'https://ytdl.do.nerdspeak.com/';

  try {
    const titleResponse = await fetch(`${endpoint}/title?url=${encodeURIComponent(url)}`, {
        method: 'GET',
        headers: {
            'x-api-key': '13dde8c6-kjna-8141-v6gu-86005e6fa28c'
        }
    });
    if (!titleResponse.ok) {
        throw new Error('Failed to fetch title');
    }
    const { title } = await titleResponse.json();
    const safeTitle = title.replace(/[^a-z0-9]/gi, '_').toLowerCase(); // Create a safe filename
    const filename = `${safeTitle}.mp3` || 'download.mp3';

    const response: Response = await fetch(`${endpoint}/download?url=${encodeURIComponent(url)}`, {
        method: 'GET',
        headers: {
            'x-api-key': '13dde8c6-kjna-8141-v6gu-86005e6fa28c'
        }
    });

    if (response.ok) {
        const blob: Blob = await response.blob();
        const downloadUrl: string = window.URL.createObjectURL(blob);
        const a: HTMLAnchorElement = document.createElement('a');
        a.href = downloadUrl;
        a.download = filename;
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

const getVideoName = async (url: string): Promise<any> => {

}