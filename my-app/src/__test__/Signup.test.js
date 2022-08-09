import { render, screen } from "@testing-library/react"
import Signup from "../page/Signup"

describe("test Signup Compornent", () => {
	test("render form with 1 button", () => {
		render(<Signup />)
		const bunttonList = screen.findAllByRole("button");
		console.log(bunttonList)
		expect(bunttonList).toHaveLength(1);
	})
})
