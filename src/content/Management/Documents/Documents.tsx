import { Card } from '@mui/material';
import { CryptoOrder } from '@/models/crypto_order';
import DocumentsTable from './DocumentsTable';
import { subDays } from 'date-fns';

function Documents() {
  const cryptoOrders: CryptoOrder[] = [
    {
      id: '1',
      orderDetails: 'Тестов Документ 1',
      orderDate: new Date().getTime(),
      status: 'completed',
      orderID: 'Test Project',
      amountCrypto: 'pdf'
    },
    {
      id: '2',
      orderDetails: 'Тестов Документ 2',
      orderDate: subDays(new Date(), 1).getTime(),
      status: 'completed',
      orderID: 'Test Project',
      amountCrypto: 'xml'
    },
    {
      id: '3',
      orderDetails: 'Тестов Документ 3',
      orderDate: subDays(new Date(), 5).getTime(),
      status: 'failed',
      orderID: 'Test Project',
      amountCrypto: 'pdf'
    },
    {
      id: '4',
      orderDetails: 'Тестов Документ 4',
      orderDate: subDays(new Date(), 55).getTime(),
      status: 'completed',
      orderID: 'Test Project',
      amountCrypto: 'png'
    },
    {
      id: '5',
      orderDetails: 'Тестов Документ 5',
      orderDate: subDays(new Date(), 56).getTime(),
      status: 'pending',
      orderID: 'Test Project',
      amountCrypto: 'xml'
    },
    {
      id: '6',
      orderDetails: 'Тестов Документ 6',
      orderDate: subDays(new Date(), 33).getTime(),
      status: 'completed',
      orderID: 'Test Project',
      amountCrypto: 'pdf'
    },
    {
      id: '7',
      orderDetails: 'Тестов Документ 7',
      orderDate: new Date().getTime(),
      status: 'pending',
      orderID: 'Test Project',
      amountCrypto: 'pdf'
    },
    {
      id: '8',
      orderDetails: 'Тестов Документ 8',
      orderDate: subDays(new Date(), 22).getTime(),
      status: 'completed',
      orderID: 'Test Project',
      amountCrypto: 'pdf'
    },
    {
      id: '9',
      orderDetails: 'Тестов Документ 9',
      orderDate: subDays(new Date(), 11).getTime(),
      status: 'completed',
      orderID: 'Test Project',
      amountCrypto: 'pdf'
    },
    {
      id: '10',
      orderDetails: 'Тестов Документ 10',
      orderDate: subDays(new Date(), 123).getTime(),
      status: 'failed',
      orderID: 'Test Project',
      amountCrypto: 'xml'
    }
  ];

  return (
    <Card>
      <DocumentsTable cryptoOrders={cryptoOrders} />
    </Card>
  );
}

export default Documents;
