<template>
 <div id="bar">
      <slot></slot>
    </div>
</template>

<script>
export default{
         name:"tabbar",
        
}
</script>
<style scoped>
 #bar{
  display:flex;
  position:fixed;
  bottom:0;
  left:0;
  right:0;
  background:white;
}
.arr6{
  background:transparent !important;
  color:white !important;
}


</style>
