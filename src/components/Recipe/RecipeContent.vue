<script setup lang="ts">
import type { Recipe } from '@/services/Database';

defineProps<{
    recipe: Recipe,
}>();
</script>

<template>
<div>
    {{ recipe }}
</div>
</template>
