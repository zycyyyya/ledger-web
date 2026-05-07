<template>
  <div class="app-container">
    <main class="main-content">
      <router-view />
    </main>
    <nav class="bottom-nav">
      <router-link to="/" class="nav-item" active-class="active">
        <span class="nav-icon">🏠</span>
        <span class="nav-text">首页</span>
      </router-link>
      <router-link to="/bill" class="nav-item" active-class="active">
        <span class="nav-icon">📋</span>
        <span class="nav-text">账单</span>
      </router-link>
      <router-link to="/add" class="nav-item add-btn" active-class="active">
        <div class="add-icon">+</div>
      </router-link>
      <router-link to="/statistics" class="nav-item" active-class="active">
        <span class="nav-icon">📊</span>
        <span class="nav-text">统计</span>
      </router-link>
      <router-link to="/settings" class="nav-item" active-class="active">
        <span class="nav-icon">⚙️</span>
        <span class="nav-text">设置</span>
      </router-link>
    </nav>
  </div>
</template>

<script setup>
</script>

<style scoped lang="scss">
.app-container {
  height: 100%;
  display: flex;
  flex-direction: column;
}

.main-content {
  flex: 1;
  overflow-y: auto;
  padding-bottom: 64px;
}

.bottom-nav {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  height: 64px;
  background: #fff;
  border-top: 1px solid #e8e8e8;
  display: flex;
  align-items: center;
  justify-content: space-around;
  z-index: 100;
}

.nav-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-decoration: none;
  color: #999;
  font-size: 12px;
  padding: 6px 12px;
  transition: color 0.2s;

  &.active {
    color: #4A90D9;
  }
}

.nav-icon {
  font-size: 20px;
  margin-bottom: 2px;
}

.add-btn {
  position: relative;
  top: -12px;

  .add-icon {
    width: 48px;
    height: 48px;
    border-radius: 50%;
    background: linear-gradient(135deg, #4A90D9 0%, #357ABD 100%);
    color: #fff;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 28px;
    font-weight: 300;
    box-shadow: 0 4px 12px rgba(74, 144, 217, 0.4);
    transition: transform 0.2s;

    &:hover {
      transform: scale(1.05);
    }
  }

  &.active .add-icon {
    background: linear-gradient(135deg, #357ABD 0%, #2868A8 100%);
  }
}

.add-btn .nav-text {
  display: none;
}
</style>
