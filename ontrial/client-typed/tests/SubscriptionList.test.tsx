import { act, render, screen } from '@testing-library/react';
import SubscriptionList from '../src/components/SubscriptionList';
import userEvent from '@testing-library/user-event';

const subMock = [
    {
        _id: '124',
        name: "bla bla",
        billingDate: "2024-03-12T00:00:00.000Z",
        cost: 10,
        status: true
    },
    {
        _id: '123',
        name: "bla bla bla",
        billingDate: "2024-04-13T00:00:00.000Z",
        cost: 12,
        status: true
    }];
const subFnMock = vi.fn(() => { });

describe.only("SubscriptionList element testing", () => {
    it("should return length if there are children", () => {
        const { container } = render(<SubscriptionList onEdit={subFnMock} subscriptions={subMock}></SubscriptionList>)
        const testArr: string[] = [];
        container.querySelectorAll('div div p').forEach(e => testArr.push(e.innerHTML))
        expect(testArr.includes(subMock[0].name)).toBe(true);
        expect(testArr.includes(subMock[1].name)).toBe(true);
    })
    it("should test whether the correct value is passed when we click a button", async () => {
        await act(() => render(<SubscriptionList onEdit={subFnMock} subscriptions={subMock}></SubscriptionList>))
        const btns = screen.getAllByRole('button')
        for (const btn of btns) {
            await userEvent.click(btn)
        }
        expect(subFnMock).toHaveBeenCalledTimes(2)
        expect(subFnMock).toHaveBeenNthCalledWith(1, subMock[0]);
        expect(subFnMock).toHaveBeenNthCalledWith(2, subMock[1]);
    })
})