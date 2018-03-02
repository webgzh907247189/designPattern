/**
 * 策略模式指的是    定义一系列的算法，把它们一个个封装起来，将不变的部分和变化的部分隔开，实际就是将算法的使用和实现分离出来；算法的使用方式是不变的
 * 一个基于策略模式的程序至少由2部分组成，第一个部分是一组策略类，策略类封装了具体的算法，并负责具体的计算过程。
 * 第二个部分是环境类Context，该Context接收客户端的请求，随后把请求委托给某一个策略类。我们先使用传统面向对象来实现；
 */
{
	class performatA{
		getMoney(salary){
			return salary*4
		}
	}

	class performatB{
		getMoney(salary){
			return salary*3
		}
	}

	class performatC{
		getMoney(salary){
			return salary*2
		}
	}

	class Bouns{
		constructor(name,salary){
			this.name = null
			this.salary = null
		}

		getSalary(salary){
			return this.salary.getMoney(salary)
		}

		setSalary(performatClass){
			this.salary = performatClass
		}
	}

	let performatABouns = new Bouns()
	performatABouns.setSalary(new performatA())
	performatABouns.getSalary(2000)
}