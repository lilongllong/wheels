# css的相关知识  
## css position 四个属性：absolute relative fixed static
- static css默认值 按照默认文件流
- fixed 按照窗口位置进行
- relative 按照static默认文件流的自身的相对位置进行偏移
- absolute 相对于首个具有position：absolute和relative祖先进行布局，直至到body节点。absolute属性将布局跳出正常的文件流

## 盒子模型
- 内容：padding margin border content
- div和span区别亦或者块级元素和行内标记的区别:块级元素前后会发生换行,行内标记前后不会发生换行

## css hack
解释：针对不同浏览器的css code的相应写法成为css hack
```
/*Mozilla内核浏览器：firefox3.5+*/
  -moz-transform: rotate | scale | skew | translate ;
 /*Webkit内核浏览器：Safari and Chrome*/
  -webkit-transform: rotate | scale | skew | translate ;
 /*Opera*/
  -o-transform: rotate | scale | skew | translate ;
 /*IE9*/
  -ms-transform: rotate | scale | skew | translate ;
 /*W3C标准*/
  transform: rotate | scale | skew | translate ;
```
## css 小尖角
解释:当div长度和高度为0时，border就会变成4个尖角，利用border的颜色与background相同即可
关键点：relative + absolute
