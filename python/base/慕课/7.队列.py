from collections import deque
from random import randint
import pickle

"""双端队列 默认存入到内存中"""
# dist2 = deque([], 5)
# 使用 dump 写入数据
# 使用 load 读取数据


def gress(n, f):
    if n == f:
        print("猜对了，这个数字就是 %d." % f)
        return True

    if n > f:
        print("猜错了，这个数字比 %d 大." % f)
    else:
        print("猜错了，这个数字比 %d 小." % f)
    return False


def main():
    # %d 是整数
    # %s 是任意数据
    copy_list = pickle.load(open("./save.pkl", "rb"))
    print("上一次的结果是 %s:" % copy_list)

    try:
        n = randint(1, 100)
        dist2 = deque([], 5)

        x = 1
        while True:
            line = input("[%d] 请输入一个数字: " % x)
            print(line, "line", n)

            if line.isdigit():
                f = int(line)
                dist2.append(f)

                x += 1
                if gress(n, f):
                    break
            elif line == "h?":
                print(list(dist2))
            elif line == "quit":
                pickle.dump(dist2, open("./save.pkl", "wb"))
                break
    except KeyboardInterrupt:
        print("按了 ctrl + c 退出了")


if __name__ == "__main__":
    main()
