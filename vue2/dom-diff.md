# dom-diff

dom-diff过程也叫patch过程，打补丁。
根据新的vnode对比旧的vnode，vnode没有的就在oldNode上加上去。
新vnode没有的，但旧的vnode有，就把旧的oldvnode去掉。

如果一致，那么以新换旧。


整个patch无非就是干三件事：

1. 创建节点：新的VNode中有而旧的oldVNode中没有，就在旧的oldVNode中创建。
2. 删除节点：新的VNode中没有而旧的oldVNode中有，就从旧的oldVNode中删除。
3. 更新节点：新的VNode和旧的oldVNode中都有，就以新的VNode为准，更新旧的oldVNode。