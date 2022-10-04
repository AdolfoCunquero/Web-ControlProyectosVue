<template>
    <v-alert
        border="left"
        colored-border
        color="indigo"
        elevation="2"
    >
        <div class="text-h5 active">
            {{title}}
        </div>
    </v-alert>
</template>
<script>
export default {
    props: ['title'],
    name: 'FormTitle',
}
</script>