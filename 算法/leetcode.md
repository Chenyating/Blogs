# leetcode题目
## url化
```js
var replaceSpaces = function(S, length) {
    var str = String.prototype.split.call(S, '').slice(0, length).join('');
    // 转成数组，截取指定长度，连接；
    var str = String.prototype.replace.call(str, /\s/g, '%20')
    return str
};
```

## 是否互为字符重排
输入: s1 = "abc", s2 = "bca"

输出: true 
```js
var CheckPermutation = function(s1, s2) {
    var a1 = String.prototype.split.call(s1, '');
    var a2 = String.prototype.split.call(s2, '');
    while (a1.length > 0) {
        for (let j = 0; j < a2.length; j++) {
            if (a1[0] == a2[j]) {
                a2.splice(j, 1);
                break;
            }
        }
        a1.shift();
    }
    if (a2.length ==0) {
        return true;
    } else {
        return false;
    }

};
```

## IP地址无效化
输入：address = "1.1.1.1"

输出："1[.]1[.]1[.]1"

输入：address = "255.100.50.0"

输出："255[.]100[.]50[.]0"

```js
var defangIPaddr = function(address) {
    // 用replace替换，注意正则表达式符号要反斜杠加全局g
    var newadd = String.prototype.replace.call(address, /\./g, '[.]');
    // 用join连接；
    var newadd = String.prototype.split.call(address, '.').join('[.]');

   return newadd;
};
```

## 数组去除指定数字

给定 nums = [3,2,2,3], val = 3,

函数应该返回新的长度 2, 并且 nums 中的前两个元素均为 2。

输入:[3,2,2,3] ,3
输出:[2,2]
预期结果:[2,2]



```js
var removeElement = function(nums, val) {
    for (let i = 0; i < nums.length; i++) {
        if (nums[i] == val) {
            // 把当前元素从数组中删除，这时候数组长度变短；
            nums.splice(i, 1)
            // 这时候数组长度变短，i要向前挪一位；
            i--
        }
    }
    return nums.length;
};
```

## 返回数组凑成指定和
给定 nums = [2, 7, 11, 15], target = 9

因为 nums[0] + nums[1] = 2 + 7 = 9

所以返回 [0, 1]


```js
var twoSum = function(nums, target) {
    for(let i=0;i<nums.length;i++){
        for(let j=i+1;j<nums.length;j++){
            if(nums[i]+nums[j]==target){
                return [i,j]
            }
        }
    }
};
```

## 字符串判断回文

输入: 121

输出: true

```js
var isPalindrome = function(x) {
    // 文字翻转相同；
    var newx = String.prototype.split.call(x,'').reverse().join('');
    if (x == newx) {
        return true;
    }
    return false;

};
```

## 动态数组加和
输入：nums = [1,2,3,4]

输出：[1,3,6,10]

解释：动态和计算过程为 [1, 1+2, 1+2+3, 1+2+3+4] 。

```js
var runningSum = function(nums) {
    var newArr = [];
    var total = 0;
    for (let i = 0; i < nums.length; i++) {
        total += nums[i];
        newArr.push(total);
    }
    return newArr;
};
```

## 数组异或操作
示例 1：

输入：n = 5, start = 0

输出：8

解释：数组 nums 为 [0, 2, 4, 6, 8]，其中 (0 ^ 2 ^ 4 ^ 6 ^ 8) = 8 。
     "^" 为按位异或 XOR 运算符。
示例 2：

输入：n = 4, start = 3
输出：8
解释：数组 nums 为 [3, 5, 7, 9]，其中 (3 ^ 5 ^ 7 ^ 9) = 8.


```js
var xorOperation = function(n, start) {
    var result = 0;
    for (let i = 0; i < n; i++) {
        result = result^(start+2*i)
    }
    return result;
};

```

## 拥有最多糖果的孩子
输入：candies = [2,3,5,1,3], extraCandies = 3

输出：[true,true,true,false,true] 

解释：

孩子 1 有 2 个糖果，如果他得到所有额外的糖果（3个），那么他总共有 5 个糖果，他将成为拥有最多糖果的孩子。

孩子 2 有 3 个糖果，如果他得到至少 2 个额外糖果，那么他将成为拥有最多糖果的孩子。

孩子 3 有 5 个糖果，他已经是拥有最多糖果的孩子。

孩子 4 有 1 个糖果，即使他得到所有额外的糖果，他也只有 4 个糖果，无法成为拥有糖果最多的孩子。

孩子 5 有 3 个糖果，如果他得到至少 2 个额外糖果，那么他将成为拥有最多糖果的孩子。

```js
var kidsWithCandies = function(candies, extraCandies) {
    var max = 0;
    for (let i = 0; i < candies.length; i++) {
        // 找出当前最多糖果的元素
        if (max < candies[i]) {
            max = candies[i];
        }
        // 每个元素加上额外数值
        candies[i]=candies[i] + extraCandies;
    }
    for (let j = 0; j < candies.length; j++) {
        // 每个元素大于或等于最多糖果数为真
        if (candies[j] >=max) {
            candies[j] = true;
        } else {
            candies[j] = false;
        }
    }
    return candies;
};
```

## 重新排列数组
输入：nums = [2,5,1,3,4,7], n = 3

输出：[2,3,5,4,1,7]
 
解释：由于 x1=2, x2=5, x3=1, y1=3, y2=4, y3=7 ，所以答案为 [2,3,5,4,1,7]

```js
// 数组一分为二
var shuffle = function(nums, n) {
    var a = nums.slice(0, n)
    var b = nums.slice(n, nums.length)
    for (let i = 0, j = 0; i < a.length; i++) {
        nums[j] = a[i];
        nums[j + 1] = b[i]
        j += 2;
    }
    return nums;
};

    // 第二种
    var shuffle = function(nums, n) {
    var ans = []
    var index = 0;
    for (var i = 0; i < n; i++) {
        ans[index++] = nums[i];
        ans[index++] = nums[n + i];
    }
    return ans;
};

```

##  左旋转字符串
输入: s = "abcdefg", k = 2

输出: "cdefgab"

```js
var reverseLeftWords = function(s, n) {
    var arr = String.prototype.split.call(s, '');
    var b, b = arr.slice(0, n);
    var c, c = arr.slice(n, arr.length);
    var d = [],
        d = c.concat(b)
    return d.join('')
};

// 或者直接
    return s.slice(n)+s.slice(0,n)
```