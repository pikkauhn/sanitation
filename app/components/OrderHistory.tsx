import { BinHistory } from "@prisma/client";

export default function OrderHistory(Response: any) {
    const adjustedHistory = Response.map((data: BinHistory) => ({
        ...data
    }));

    const orderedHistory: BinHistory[] = adjustedHistory.sort((
        historyA: { id: string; startDate: Date; endDate: Date | null },
        historyB: { id: string; startDate: Date; endDate: Date | null }
    ) => {
        if (historyA.endDate && !historyB.endDate) {
            return 1;
        } else if (!historyA.endDate && historyB.endDate) {
            return -1;
        }

        if (historyA.startDate !== historyB.startDate) {
            return new Date(historyB.startDate).getTime() - new Date(historyA.startDate).getTime();
        }
    }
    )
    if (orderedHistory.length > 0) {
        return orderedHistory;
    }
}