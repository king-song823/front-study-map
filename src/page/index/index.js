import React, { useEffect, useState, useCallback } from "react";
import { useHistory } from "react-router-dom";
import Select from "react-select";
import domtoimage from "dom-to-image";
import Switch from "rc-switch";
import "rc-switch/assets/index.css";
import drawRoadmap from "./drawRoadmap";
import * as roadMap from "./roadmap";
import "./style.css";

const options = [
  { value: "all", label: "完整路线", canvasHeight: 5000 },
  { value: "p1", label: "鸡头白脸,找份工作", canvasHeight: 2000 },
  { value: "p2", label: "持续精进,稳扎稳打", canvasHeight: 3000 },
  { value: "p3", label: "进阶突破，冲击大厂", canvasHeight: 2000 },
  // { value: "p10000", label: "养生路线" },  // 这个也挺重要的，哈哈！(手动狗头
];

function Index() {
  const history = useHistory();

  const [process, setProcess] = useState(options[0]);
  // const [height, setHeight] = useState(options[0].canvasHeight);
  const [showTag, setShowTag] = useState(true);

  useEffect(() => {
    const canvas = drawRoadmap(
      `roadmapCanvas`,
      roadMap[process.value],
      showTag
    );
    // canvas.setHeight(process.canvasHeight);
    const canvasMouseDownHandler = (options) => {
      if (options.target && options.target.link) {
        // 是否有跳转到markdown，从markdown返回的时候需要绘制一次
        window.__GO_TO_MARKDOWN__ = true;
        history.push(`/guide${options.target.link}`);
      }
    };
    canvas.on("mouse:down", canvasMouseDownHandler);
    return () => {
      canvas.off("mouse:down", canvasMouseDownHandler);
    };
  }, [history, process, showTag]);

  const onShowTag = useCallback((value) => {
    setShowTag(value);
  }, []);

  const onDownloadImg = useCallback(() => {
    const $el = document.querySelector(".roadmap");
    const downloadName = process.label
      .replace(/\uD83C[\uDF00-\uDFFF]|\uD83D[\uDC00-\uDE4F]/g, "")
      .trim();
    domtoimage.toJpeg($el).then(function (dataUrl) {
      const link = document.createElement("a");
      link.download = `roadmap-${downloadName}.jpeg`;
      link.href = dataUrl;
      link.click();
    });
  }, [process]);

  return (
    <div className="roadmap-container">
      <div className="process-select-container">
        <div className="tag-switch">
          <span>展示标签</span>
          <Switch
            checkedChildren="开"
            unCheckedChildren="关"
            defaultChecked
            onChange={onShowTag}
          />
        </div>
        <Select
          options={options}
          defaultValue={options[0]}
          onChange={setProcess}
          placeholder="请选择"
          className="process-select"
        />
        <div className="download" onClick={onDownloadImg}>
          下载路线图
        </div>
      </div>

      <div className="roadmap">
        {showTag && (
          <div className="desc-container">
            <div className="explain-square">
              <div className="explain-content">
                <div>
                  1.{" "}
                  <span role="img" aria-label="recommend">
                    ⭐️
                  </span>{" "}
                  - 推荐使用
                </div>
                <div>
                  2.{" "}
                  <span role="img" aria-label="prepare">
                    ✅
                  </span>{" "}
                  - 备选方案
                </div>
                <div>
                  3.{" "}
                  <span role="img" aria-label="no recommend">
                    ❎
                  </span>{" "}
                  - 不推荐学习（技术已过时或其他原因）
                </div>
                <div>
                  4.
                  <span className="grey-card">xxxx</span> - 需要时再学
                </div>
              </div>
            </div>
          </div>
        )}
        <div>
          <canvas id={`roadmapCanvas`} height="5000px" width="1000px" />
        </div>
      </div>
    </div>
  );
}

export default Index;
