import { fireEvent, render, screen } from "@testing-library/react";
import { createRef } from "react";
import Input from "./Input";

describe("Input", () => {
  it("input이 화면에 렌더링된다", () => {
    render(<Input />);
    expect(screen.getByRole("textbox")).toBeInTheDocument();
  });

  it("placeholder가 잘 보인다", () => {
    render(<Input placeholder="이름을 입력하세요" />);
    expect(
      screen.getByPlaceholderText("이름을 입력하세요"),
    ).toBeInTheDocument();
  });

  it("텍스트를 입력하면 값이 바뀐다", () => {
    render(<Input defaultValue="" />);
    const input = screen.getByRole("textbox");

    fireEvent.change(input, { target: { value: "홍길동" } });
    expect(input).toHaveValue("홍길동");
  });

  it("disabled면 입력이 안 된다", () => {
    render(<Input disabled />);
    expect(screen.getByRole("textbox")).toBeDisabled();
  });

  it("ref가 input 요소를 가리킨다", () => {
    const ref = createRef<HTMLInputElement>();
    render(<Input ref={ref} />);
    expect(ref.current).not.toBeNull(); // ref가 연결됐는지
    expect(ref.current?.tagName).toBe("INPUT"); // 진짜 input 태그인지
  });
});
