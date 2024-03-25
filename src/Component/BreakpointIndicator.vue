<template>
<div class='breakpoint-indicator'>
    <a href="https://getbootstrap.com/docs/5.3/" target="_blank">
        <div class="d-block d-sm-none">XS</div>
        <div class="d-none d-sm-block d-md-none">SM</div>
        <div class="d-none d-md-block d-lg-none">MD</div>
        <div class="d-none d-lg-block d-xl-none">LG</div>
        <div class="d-none d-xl-block d-xxl-none">XL</div>
        <div class="d-none d-xxl-block">XXL</div>
    </a>
</div>
</template>

<style scoped>
.breakpoint-indicator {
    position: fixed;
    bottom: 15px;
    left: 20px;
    z-index: 10000;
}

a {
    text-decoration: none;
    color: initial;
}

.breakpoint-indicator div {
    padding: .3em 0.7em;
    border-radius: 30px;
}

.breakpoint-indicator .d-sm-none {
    background: #ffabab;
}

.breakpoint-indicator .d-sm-block {
    background: #ffdbab;
}

.breakpoint-indicator .d-md-block {
    background: #ccec98;
}

.breakpoint-indicator .d-lg-block {
    background: #4ae3cc;
}

.breakpoint-indicator .d-xl-block {
    background: #8eacf1;
}

.breakpoint-indicator .d-xxl-block {
    background: #e38bee;
}
</style>
