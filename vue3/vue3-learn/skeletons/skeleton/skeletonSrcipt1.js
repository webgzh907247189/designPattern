window.SkeletonSdk = (function () {
  const $$ = document.querySelectorAll.bind(document);
  const REMOVE_TAGS = ["title", "meta", "script", "style"];
  const styleCache = new Map();
  const CLASS_PREFIX = "sk-";
  const SMALL_BESE64 =
    "data:image/gif;base64,R01GOD1HAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7";

  const buttonHandler = (itemBtnEle, options) => {
    const className = CLASS_PREFIX + "button";
    const rule = `{
      color: ${options.color}!important;
      background: ${options.color}!important;
      border: none !important;
      box-shadow: none !important;
    }`;

    addStyle(`.${className}`, rule);
    itemBtnEle.classList.add(className);
  };
  const addStyle = (selector, rule) => {
    if (!styleCache.has(selector)) {
      styleCache.set(selector, rule);
    }
  };

  const imgHandler = (itemImgEle, options) => {
    const { width, height } = itemImgEle.getBountClientRect();
    const attrs = { width, height, src: SMALL_BESE64 };
    setAttributes(itemImgEle, attrs);

    const className = CLASS_PREFIX + "image";
    const rule = `{
     background: ${options.color}!important;
   }`;
    addStyle(`.${className}`, rule);
    itemImgEle.classList.add(className);
  };
  const setAttributes = (itemImgEle, attrs) => {
    Object.keys(attrs).forEach((key) => {
      itemImgEle.setAttribute(key, attrs[key]);
    });
  };

  // 遍历 dom 树，获取每一个元素进行转换
  function genSkeleton(options) {
    let rootElement = document.documentElement;
    ((options) => {
      const preTraverse = (element) => {
        // debugger
        if (element.children && element.children.length > 0) {
          // 深度优先遍历 -> 优先 children
          const childrenList = Array.from(element.children);
          childrenList.forEach((itemChildrenEle) => {
            preTraverse(itemChildrenEle);
          });
        }

        if (element.tagName === "BUTTON") {
          buttons.push(element);
        } else if (element.tagName === "IMG") {
          images.push(element);
        }
      };
      
      const { button, image } = options;

      let buttons = [];
      let images = [];

      // debugger
      preTraverse(rootElement);

      // debugger

      buttons.forEach((itemBtn) => {
        buttonHandler(itemBtn, button);
      });

      // debugger
      images.forEach((itemImg) => {
        imgHandler(itemImg, image);
      });
    })(options);

    let rules = "";
    for (const [selector, rule] of styleCache) {
      rules += `${selector} ${rule}\n`;
    }

    console.log(rules, "???");
    const styleElement = document.createElement("style");
    styleElement.innerHTML = rules;
    document.head.appendChild(styleElement);

    return "";
  }

  function genHtmlAndStyle(rootNodeContainer) {
    const styles = Array.from($$("style"), (style) => {
      return style.innerHTML || style.innerText;
    });

    // const scripts = Array.from($$(REMOVE_TAGS.join(', ')), (element) => {
    //   return element.parentNode.removeChild(element)
    // })
    // debugger
    const html = rootNodeContainer ? document.getElementById(rootNodeContainer).innerHTML : document.body.innerHTML;
    // debugger
    console.log(html, "html");
    return { html, styles };
  }

  return {
    genSkeleton,
    genHtmlAndStyle,
  };
})();
