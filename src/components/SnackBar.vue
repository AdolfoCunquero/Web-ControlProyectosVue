<template>
  <vue-toastr ref="mytoast"></vue-toastr>
</template>
<script>
import VueToastr from "vue-toastr";
export default {
  components: {
    "vue-toastr": VueToastr,
    VueToastr,
  },
  props: ['msg',"type"],
  created(){
    this.$refs.mytoast.defaultProgressBar = false;
    this.$refs.mytoast.defaultTimeout = 3000; 
    this.$refs.mytoast.defaultPosition = "toast-top-center";
    if(type == this.type){
        this.$refs.mytoast.e(this.msg);
    }
  }
}
</script>