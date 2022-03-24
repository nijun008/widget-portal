<template>
  <div class="wallpaper-box"></div>
</template>

<style scoped lang="scss">
.wallpaper-box {
  position: absolute;
  z-index: -1;
  filter: blur(var(--wallpaper-blur));
  top: calc(var(--wallpaper-blur) * -2);
  right: calc(var(--wallpaper-blur) * -2);
  bottom: calc(var(--wallpaper-blur) * -2);
  left: calc(var(--wallpaper-blur) * -2);
  background-size: cover;
  background-position: center center;
  background-image: url('https://dogefs.s3.ladydaily.com/~/source/unsplash/photo-1639402477084-7e98f693c98a?ixid=MnwxMjA3fDB8MXx0b3BpY3x8Ym84alFLVGFFMFl8fHx8fDJ8fDE2NDA4NjQwMTM&ixlib=rb-1.2.1&w=2560&fm=jpg');
}
</style>
