import { fireEvent, render, screen } from "@testing-library/react";
import Button from "./Button";

describe("Button", () => {
  it("텍스트가 화면에 보인다", () => {
    render(<Button>클릭하세요</Button>);
    expect(screen.getByText("클릭하세요")).toBeInTheDocument();
  });

  it("클릭하면 onClick이 실행된다", () => {
    const handleClick = jest.fn(); // 함수
    render(<Button onClick={handleClick}>클릭하세요</Button>);

    fireEvent.click(screen.getByText("클릭하세요"));
    expect(handleClick).toHaveBeenCalledTimes(1); // 1번 호출됐는지 확인
  });

  it("disabled면 클릭이 안 된다", () => {
    const handleClick = jest.fn();
    render(
      <Button disabled onClick={handleClick}>
        클릭하세요
      </Button>,
    );

    fireEvent.click(screen.getByText("클릭하세요"));
    expect(handleClick).not.toHaveBeenCalled(); // 한 번도 안 불렸는지 확인
  });
});
