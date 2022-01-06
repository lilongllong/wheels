/*
普通函数内不能使用yield,例如forEach map reduce 等等
因此循环可以使用for
*/

const matrix = [ [1, 2, 3], [4, 5, 6], [7, 8, 9]];
/* for yield */
function *print(matrix)
{
    for (let i = 0; i < matrix.length; i++)
    {
        const row = matrix[i];
        for (let j = 0; j < row.length; j++)
        {
            yield row[j];
        }
    }
}

const iterator =  print(matrix);
/* for 输出*/
for(let cell of iterator)
{
    console.log(cell);
}
/* while 输出  */
const iterator2 = print(matrix);
let cell = null;
let index = 0;
while((cell = iterator2.next(), !cell.done))
{
    console.log(cell.value);
}
