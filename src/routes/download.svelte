<script lang="ts">
  import { downloadAudio } from '$lib/downloadAudio';
  import { ProgressRadial } from '@skeletonlabs/skeleton';
  let url: string = '';
  let isLoading: boolean = false;

  async function handleDownload() {
    if (!url) return;
    isLoading = true; // Start loading
    try {
        await downloadAudio(url);
    } catch (error) {
        console.error('Download failed:', error);
        alert('Failed to download audio.'); // Consider a more user-friendly error handling
    } finally {
        isLoading = false; // Stop loading regardless of success or failure
    }
  }
</script>
<div class="flex justify-center space-x-2">
  <form on:submit|preventDefault={handleDownload}>
    <label class="label">
      <span>Youtube Video URL</span>
      <input class="input" type="text" bind:value={url} placeholder="https://music.youtube.com/watch?v=weajIHE0Sko&si=CV-qU2Jn397v1y3q" />
    </label>
    <br/>
    <button type="submit" class="btn variant-filled-secondary">Download MP3</button>
  </form>
</div>

{#if isLoading}
<div class="flex justify-center space-x-2">
  <ProgressRadial />
</div>
{/if}