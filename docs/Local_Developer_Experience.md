# 本地开发体验的问题
随着服务越来越多，开发人员的体验可能会开始变差。像JVM这样的资源密集型的runtimes会限制开发人员的单台机器上可以运行的微服务的数量。我可以在笔记本电脑上以单独的进程运行四个或五个基于JVM的微服务，但是我可以运行十个或二十个吗？可能不行。即使使用占用资源较少的runtimes，可以在本地运行的服务数量也有限制。当我们无法在一台机器上运行整个系统时，我们会不可避免地开始讨论该怎么办。

## 该问题如何表现出来
由于必须维护更多的服务，因此需要更长的时间来执行本地构建并运行服务，每天的开发进度可能会开始放慢速度。开发人员将开始需要更大性能的机器来出来解决他们必须处理的服务数量。对于短期方案而言，这种方式是可以的。但是，如果我们的服务数量在持续的增加时，采用更大性能的机器仅仅可以为我们争取一点时间而已。

## 该问题何时会发生
这个问题何时能确切的表现出来取决于开发人员希望在本地运行的服务数量以及这些服务的资源占用量。使用Go，Node或Python的团队很可能会发现他们可以在遇到资源约束之前在本地运行更多服务——但是使用JVM的团队可能会更早的遇到此问题。

我还认为，对多个服务实行集体所有制的团队更容易受到这个问题的影响。在开发过程中，这些团队更需要在不同服务之间切换的能力。对少量的服务实行强代码所有制的团队通常只会专注于自己的服务，并且更有可能开发出机制来打桩其无法控制的外部服务。

## 该问题如何解决
如果我想在本地开发，但是想减少在本地必须运行的服务数量，那么一种常见的技术就是为那些不想运行在本地的服务“打桩”，或者使用运行在其他地方的服务实例。纯粹的远程开发可以让我们对托管在功能更强大的基础设施上的许多服务进行开发。但是，随之而来的挑战是：
* 远程开发的联通性，这对于远程工作人员或经常出差的人来说可能是一个问题
* 从远程部署软件到发现服务可以正常运行的反馈周期较慢
* 开发人员所需的开发资源或与其相关联的资源成本的爆炸性增长

[Telepresence](https://www.telepresence.io/)是一个旨在让Kubernetes用户可以更轻松地进行本地/远程混合开发的工具。我们可以在本地开发服务，Telepresence可以将对其他服务的调用代理到远程群集，从而使得我们可以两全其美。Azure的云功能也可以在本地运行，但可以连接到远程的云资源，从而使我们可以利用快速的本地开发流程创造出的功能来创建服务，同时仍然可以在云环境中运行这些服务。

{% hint style='working' %}
**telepresence**

kubernetes集群内部的微服务的特点是，各微服务之间在集群内可以互相访问，集群外部没有很好的方法来获取集群内部的功能，比如获取数据库中的数据。当然，实际上，借助于service的nodePort可以实现。

此外，当前的CICD流程步骤为: 提交代码 -> jenkins 拉取源码 -> maven编译 -> docker编译 -> 部署
多个步骤，虽然该过程由jenkins自动完成，但是每次调试均需要经历该步骤，降低效率。

telepresence是一款为kubernetes微服务框架提供快速本地化开发功能的开源软件。通过telepresence，可以实现在本机运行本地代码，本地代码能够获取远端k8s集群的各项资源。说白了，telepresence就是给本机提供了k8s集群的代理，使本机直连到远程k8s集群，从而访问集群内部资源。
{% endhint %}

认识到开发体验会随服务数量的增加而发生的变化非常重要，因此我们需要适当的反馈机制。我们需要持续的投入，以确保随着开发人员所使用的服务数量的增加，他们仍然能保持尽可能高的生产力。
