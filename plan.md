# Plan: Fix Video Playback Issues

The user reports that videos are not playing. Analysis reveals a potential issue in `WatchParty.tsx` where a new Blob URL is created on every render for local files, and possible improvements needed in `CustomPlayer.tsx` for better lifecycle management and error handling.

## 1. Fix `WatchParty.tsx`
- Move the Blob URL creation for local files into a `useMemo` hook to prevent the video from resetting on every render.
- Ensure proper cleanup of the Blob URL using `URL.revokeObjectURL` to avoid memory leaks.

## 2. Enhance `CustomPlayer.tsx`
- Add a `key={url}` to the `video` element to ensure it re-renders/resets correctly when the source changes.
- Add error handling to the video element to notify the user if a video fails to load.
- Add a loading state to show a spinner while the video is buffering/loading.
- Update `useEffect` dependencies to include `url` to ensure listeners are correctly attached if the video element instance changes (though unlikely with refs, it's safer to handle state resets there).
- Ensure `isPlaying` state is synced with the actual video state.

## 3. Verification
- Validate the build to ensure no TypeScript errors.
- The UI should now correctly play both the hardcoded placeholder video and local uploaded files.
