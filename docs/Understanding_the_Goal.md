直接讨论拆解单体应用的技术细节实在是太简单了，本书的剩余部分会重点关注拆解单体应用的技术细节。但是在此之前，我们确实需要先探讨一些非技术的问题：

* 从系统的哪个部分开始迁移？
* 如何管理变更？
* 如何在迁移过程中带动其他人？
* 还有一个需要在早期就思考的重要问题——是否应该首先使用微服务？

# 了解迁移的目标
微服务不是我们的目标。我们也不会因为选择了微服务架构而“获胜”。 选择微服务架构应该是一个清醒的决定，该决定是基于理性决策的结果。我们选择迁移到微服务架构的目的是实现当前的系统架构无法实现的功能。

如果不了解要实现的目标，我们又如何为我们要选择哪种方案的决策过程提供信息？我们对微服务架构的期望会影响我们关注的焦点以及工作的优先级。

了解我们的目标会帮助我们避免成为分析瘫痪（在面临大量选择时，做出过度分析，最终导致无法作出任何决择）的受害者。不了解目标还会让我们面临陷入**货物崇拜**[^译注1]的风险，此时我们就会假设：“如果微服务对Netflix有好处，那么微服务对我们也有好处！”

> **<div align="center">微服务的普遍问题</div>**
> 
> 多年以前，我在一次会议上组织了一个微服务研讨会。像往常一样，我希望了解与会者为什么会参与该研讨会，以及他们希望通过这次研讨会获得什么。在这次研讨会中，有几个与会者来自同一家公司。我也非常好奇：为什么他们的公司会派遣他们参与这次研讨会。
> 
> 我问了他们其中的一员：“你为什么要参与这次研讨会？你为什么会对使用微服务感兴趣？”
> 
> 然而他们的答案却让我吃惊：“我们也不知道原因呀，我们的老板通知我们来参与这次研讨会！”
> 
> 他们的回答引起了我的兴趣，我也想对此一探究竟。
> 
> 我继续追问：“那么，你知道老板为什么让你参与这次研讨会吗？”
> 
> 与会者回答：“好吧，你可以直接问一下我们的老板，他就坐在我们的后面。” 
> 
> 于是，我问了他们的老板同样的问题：“你们为什么要使用微服务？”
> 
> 他们老板的回答同样令我无言以对：“我们的CTO说我们正在做微服务，所以我认为我们应该弄清楚微服务到底是什么！”
> 
> 
> 这个真实的故事虽然很有趣，但却是关于微服务的一个普遍的问题。我遇到过很多团队，他们在决定采用微服务架构之前并没有真正了解他们为什么要采用微服务架构或者他们希望采用微服务架构来实现什么目的。

如果对为什么要使用微服务架构没有一个清晰的认识，则会带来各种各样的问题。微服务可能需要大量的资源投入，这些投入或者是直接的人力或者资金的增加，或者是在增加服务新特性的同时需要安排好微服务改造的优先级。事实上，因为可能需要经过一段时间的积累才能看到微服务改造带来的好处，所以这会使情况变的更加复杂。有时候，这会导致团队陷入如下的场景：在经历了一年或更长时间的微服务改造之后，团队成员却已经忘记了当初为什么要对系统进行微服务改造。这不仅仅是一个简单的**沉没成本谬误（*sunk cost fallacy*）**[^译注2]的问题，实际上整个团队根本就不知道为什么要迁移到微服务架构。

{% hint style='working' %}
**沉默成本谬误的例子**

你花钱买了一张电影票，看了半个小时以后发现这是一部浪费时间的烂片。你是拔腿就走，还是坚持看完？

你在站台等了二十分钟，公交车都迟迟不来。你是打个出租车走呢，还是继续在站台等？

依据亚当·斯密的“理性人”假设，人会通过谨慎思考，做出最理性的决策，以谋求利益的最大化。因此，在发现成本已经沉没时，理性的做法，当然是只考虑未来的成本和收益。但是人类并没有超级计算机那样理性冷静的头脑，在做出决策时，往往过于重视已付出的成本，从而掉入沉没成本谬误的陷阱。

陶渊明说：悟已往之不谏，知来者之可追。就是这个意思。
{% endhint %}

同时，我还会收到**分享关于迁移微服务架构的ROI**的需求。有些团队希望通过确凿的事实和数据来支撑他们为什么应该考虑采用微服务架构的决策。然而实际情况又是另一番光景：由于没有对如上提到的微服务的相关问题进行详细的分析研究（即使团队也确实做过一些调研），调研中分析到的优势可能会因为团队之间所处的背景不同而很难移植。

那么，我们又将何去何从？靠猜来工作？答案当然是否定的。我坚信我们能够并且应该可以对我们的开发、技术以及架构选择的有效性进行更好的研究。为此，很多工作已经完成并且以类似[`The State of DevOps Report`](https://cloud.google.com/devops/state-of-devops/)的形式发布出来，然而类似的工作对于架构的分析却谈之甚少。在决策中，我们至少应该努力采用更具批判性的思维，并采用实验的心态来替换那些迁移前的严格的调研工作。

对于希望实现的目标，我们需要有一个清晰的了解。如果无法正确的评估我们所寻求的回报，那么也就无法计算ROI。我们要专注于希望实现的结果，而不是一味地坚持单一的方法。我们需要明智地思考到达目标的最佳方法，即使这意味着要放弃大量工作或者重新回到老式的枯燥乏味的但却是有效的方法，我们也要执行。

## 三个关键问题
在与公司合作以帮助他们了解是否应该考虑采用微服务架构时，我倾向于提出相同的问题：

### 希望实现什么？
这应该是与业务目标一致的一组结果，并且可以用系统所能提供的用户价值来描述清楚。

### 是否考虑过微服务的替代方案？
正如我们稍后将探讨的那样，通常还会有很多其他的方案也可以实现微服务所带来的类似的好处。

是否了解过这些方案？

如果没有，为什么不去了解一下？

有时，使用更简单的技术就可以达到目标。

### 如何知道迁移过程是否有效？
如果决定着手微服务的迁移，如何知道迁移过程是否朝着正确的方向开展？

我们将在本章的结尾处再讨论该主题。

我已经不止一次地发现，提出如上的这些问题足以让公司重新考虑是否要继续采用微服务架构。

---

[^译注1]: [货物崇拜](https://baike.baidu.com/item/%E8%B4%A7%E7%89%A9%E5%B4%87%E6%8B%9C/5251296)：是一种宗教形式，尤其出现于一些与世隔绝的落后土著之中。当货物崇拜者看见外来的先进科技物品，便会将之当作神祇般崇拜。

[^译注2]: [沉默成本](https://baike.baidu.com/item/%E6%B2%89%E6%B2%A1%E6%88%90%E6%9C%AC/5740352)：沉没成本由诺贝尔经济学奖的获得者，芝加哥大学教授理查德·泰勒提出，是已发生或承诺，无法收回的成本支出。从决策的角度看，以往发生的费用只是造成当前状态的某个因素，当前决策所要考虑的是未来可能发生的费用及所带来的收益，而不考虑以往发生的费用。人们在决定是否去做一件事情的时候，不仅是看这件事对自己有没有好处，而且也看过去是不是已经在这件事情上有过投入。我们把这些已经发生不可收回的支出，如时间、金钱、精力等称为“沉没成本”。
