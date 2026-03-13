<template>
  <div class="card card-custom skeleton">
    <div class="card-header p-0 position-relative mt-n4 mx-3 z-index-2">
      <div class="skeleton-img"></div>
    </div>
    <div class="card-body">
      <div class="skeleton-title"></div>
      <div class="skeleton-text"></div>
      <div class="skeleton-text short"></div>
      <div class="d-flex gap-2 mt-3">
        <div class="skeleton-btn"></div>
        <div class="skeleton-btn"></div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Skeleton base */
.skeleton {
  position: relative;
  overflow: hidden;
}

.skeleton::after {
  content: "";
  position: absolute;
  top: 0;
  left: -150px;
  width: 100px;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent);
  animation: shimmer 1.5s infinite;
}

/* Skeleton elements */
.skeleton-img {
  width: 100%;
  height: 180px;
  border-radius: 12px;
  background: #e5e7eb;
}

.skeleton-title {
  width: 60%;
  height: 20px;
  margin: 12px 0;
  border-radius: 6px;
  background: #e5e7eb;
}

.skeleton-text {
  width: 100%;
  height: 14px;
  margin-bottom: 8px;
  border-radius: 6px;
  background: #e5e7eb;
}

.skeleton-text.short {
  width: 80%;
}

.skeleton-btn {
  flex: 1;
  height: 32px;
  border-radius: 8px;
  background: #e5e7eb;
}

/* Animación shimmer */
@keyframes shimmer {
  0% { left: -150px; }
  100% { left: 100%; }
}
</style>