## 首字母大写
```
let arr = "here are 4 boys";
arr.split("").reduce((prev, cur, index) => {
    if (index === 0 )
    {
        return prev.concat(cur.toUpperCase());
    }
    else
    {
        if ( prev.charAt(index-1) === " " )
        {
            return prev.concat(cur.toUpperCase());
        }
        else
        {
            return prev.concat(cur);
        }
    }
}, "");

```
