import Mock from 'better-mock';

// Define interfaces for the mock data and response

interface TableDataItem {
  name: string;
  todayBuy: number;
  monthBuy: number;
  totalBuy: number;
}

interface StatisticalDataResponse {
  code: number;
  data: {
    tableData: TableDataItem[];
  };
}


export default {
  getStatisticalData: (): StatisticalDataResponse => {

    // Return with a properly typed response
    return {
      code: 20000,
      data: {
        tableData: [
          {
            name: 'OPPO',
            todayBuy: 500,
            monthBuy: 3500,
            totalBuy: 22000,
          },
          {
            name: 'Nokia',
            todayBuy: 300,
            monthBuy: 2200,
            totalBuy: 24000,
          },
          {
            name: 'Apple',
            todayBuy: 800,
            monthBuy: 4500,
            totalBuy: 65000,
          },
          {
            name: 'Huawei',
            todayBuy: 1200,
            monthBuy: 6500,
            totalBuy: 45000,
          },
          {
            name: 'Samsung',
            todayBuy: 300,
            monthBuy: 2000,
            totalBuy: 34000,
          },
          {
            name: 'Google',
            todayBuy: 350,
            monthBuy: 3000,
            totalBuy: 22000,
          },
        ],
      },
    };
  },
};