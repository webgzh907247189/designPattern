"""
python 是解释型语言


js 也算是 解释型语言
早期解释执行: 引擎读取 JS 代码, 解析一行执行一行, 速度相对较慢。现代即时编译 (JIT):
现代 JS 引擎引入了 JIT (Just-In-Time)技术。引擎会检测哪些代码被高频调用 (称为“热点代码”),并将这些代码直接编译成机器码保存下来。
当再次执行时,直接运行编译后的机器码,从而极大提升了运行速度
"""

""" 
python 运行流程
    源代码(.py文件) -> 字节码(.pyc, 文件内容就是 字节码) -> python虚拟机执行 -> 结果

python 解释器工作流程:
    词法分析(切分为 Token) -> 语法分析(构建 AST) -> 编译(把 AST编译为 字节码)  -> 执行 (python 虚拟机[PVM] 执行字节码指令)
"""


"""
mac/linux 使用 python3 --version
window    使用 python --version
"""


print("hello")
if 1:
    print("12313", "哈哈哈", sep="--")


# f-string
name = "test"
print(f"姓名：{name}")


from decimal import Decimal

amt = Decimal("1234.5")
print("{:.2f}".format(amt))


READ = 1 << 0  # 0
WRITE = 1 << 1  # 2
DELETE = 1 << 2  # 4
ADMIN = 1 << 3  # 8

user_perm = READ | WRITE | DELETE
print(int(user_perm))

if user_perm & WRITE:
    print("拥有 写的权限")
if user_perm & DELETE:
    print("拥有 删除的权限")

# 增加权限
user_perm |= ADMIN

if user_perm & ADMIN:
    print("拥有 管理员的权限")
else:
    print("没有 管理员的权限")


b = "你好".encode("utf-8")
print(b)  # b'\xe4\xbd\xa0\xe5\xa5\xbd'


print(True == 1)  # True
print(all([]))  # True


# 定义带打印副作用的函数
def double(x):
    print(f"Doubling {x}...")
    return x * 2


# 生成器表达式：惰性求值，不会立即执行
evens = (double(x) for x in range(10) if x % 2 == 0)
print(evens)

# 消费生成器，转为列表时才真正执行
print(list(evens))


a = 1
b = 1
print(a is b)  # True


price = 19.9876
print(round(price, 2))  # 20.0（注意：round(2.5) 为 2，银行家舍入）
print(f"¥{price:.2f}")  # ¥19.99


locations = {(31.2, 121.5): "上海"}
# 列表不能作键
# {[1, 2]: "x"}   # TypeError
print(locations)


ids = [1, 2, 2, 3, 3]
unique_ids = list(set(ids))
print(unique_ids)  # [1, 2, 3]


empty = set()  # 空集合必须用 set()
print(empty)  # set()


viewed = {"home", "cart", "pay"}
purchased = {"cart", "pay"}
print("对称差:", viewed ^ purchased)


person = {"name": "Bob", "age": 25}
person["age"] = 26  # 改已有键
person["city"] = "Beijing"  # 新增键
person.update({"job": "dev"})  # 批量更新
print(person)  # {'name': 'Bob', 'age': 26, 'city': 'Beijing', 'job': 'dev'}

role = person.pop("job", None)  # 删除并返回值，无键时返回 None
print(role)  # dev


users = [{"id": 1, "name": "A"}, {"id": 2, "name": "B"}]
by_id = {u["id"]: u for u in users}
print(
    by_id, by_id[2]["name"]
)  # {1: {'id': 1, 'name': 'A'}, 2: {'id': 2, 'name': 'B'}}    B


for item in range(10, 0, -2):
    print(item, "", "-")

print(int("FF", 16))  # 255


class Pipe1:
    def __init__(self):
        print("123")

    # 类里面 实现了 __call__ 方法之后，类的实列 才能当成函数被调用 (否则报错，如果没有 __call__ 方法， 调用 pipe() 就会报错)
    def __call__(self, *args, **kwargs):
        # 当把 类的实列 直接当成函数来调用，就会走到 __call__ 方法
        print("pipe call")
        return "test"


pipe1 = Pipe1()
print(pipe1())


class Pipe:
    def __init__(self, func):
        print("123")
        self.func = func

    def __ror__(self, source):
        return self.func(source)


def double(iterable):
    return (x * 2 for x in iterable)  # 生成器


map = Pipe(double)


def filterFn(iterable):
    return (x for x in iterable if x > 5)  # 生成器


filter = Pipe(filterFn)


def islice(iterable):
    from itertools import islice

    return islice(iterable, 3)


take = Pipe(islice)

result = range(10) | map | filter | take

print(list(result))  # [6, 8, 10]


# 示例：manage.py 在项目根时
from pathlib import Path

# 项目根目录
BASE_DIR = Path(__file__).resolve().parent
# 拼接 .env 文件路径
env_file = BASE_DIR / ".env"
print(env_file)  # /Users/web/Documents/workspace/designPattern/python/base/.env


from collections import namedtuple

S = namedtuple("H", ["name", "age", "genner"])


Student = S("test", "32", "eat & drink")
print(isinstance(Student, tuple), Student.age)  # True 32

Student1 = S(name="test1", age="321", genner="eat & drink1")
print(Student1[0])  # test1


# 创建文件夹 (已经存在，不会报错)
BASE_DIR1 = Path(__file__).parent / "test"
(BASE_DIR1).mkdir(parents=True, exist_ok=True)
