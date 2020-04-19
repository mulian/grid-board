import { slideReducer, slideInitialState } from "./slide.reducer"

describe("Slide Reducer", () => {
    describe("an unknown action", () => {
        it("should return the previous state", () => {
            const action = {} as any

            const result = slideReducer(slideInitialState, action)

            expect(result).toBe(slideInitialState)
        })
    })
})
