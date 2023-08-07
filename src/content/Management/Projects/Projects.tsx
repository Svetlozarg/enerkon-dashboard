import { Card } from '@mui/material';
import { CryptoOrder } from '@/models/crypto_order';
import ProjectsTable from './ProjectsTable';
import { subDays } from 'date-fns';

function Projects() {
  const cryptoOrders: CryptoOrder[] = [
    {
      id: '1',
      orderDetails: 'Проект 1',
      orderDate: new Date().getTime(),
      status: 'completed',
      orderID: 'Снимка',
      amountCrypto: 'Документи'
    },
    {
      id: '2',
      orderDetails: 'Проект 2',
      orderDate: subDays(new Date(), 1).getTime(),
      status: 'completed',
      orderID: 'Снимка',
      amountCrypto: 'Документи'
    },
    {
      id: '3',
      orderDetails: 'Проект 3',
      orderDate: subDays(new Date(), 5).getTime(),
      status: 'failed',
      orderID: 'Снимка',
      amountCrypto: 'Документи'
    },
    {
      id: '4',
      orderDetails: 'Проект 4',
      orderDate: subDays(new Date(), 55).getTime(),
      status: 'completed',
      orderID: 'Снимка',
      amountCrypto: 'Документи'
    },
    {
      id: '5',
      orderDetails: 'Проект 5',
      orderDate: subDays(new Date(), 56).getTime(),
      status: 'pending',
      orderID: 'Снимка',
      amountCrypto: 'Документи'
    },
    {
      id: '6',
      orderDetails: 'Проект 6',
      orderDate: subDays(new Date(), 33).getTime(),
      status: 'completed',
      orderID: 'Снимка',
      amountCrypto: 'Документи'
    },
    {
      id: '7',
      orderDetails: 'Проект 7',
      orderDate: new Date().getTime(),
      status: 'pending',
      orderID: 'Снимка',
      amountCrypto: 'Документи'
    },
    {
      id: '8',
      orderDetails: 'Проект 8',
      orderDate: subDays(new Date(), 22).getTime(),
      status: 'completed',
      orderID: 'Снимка',
      amountCrypto: 'Документи'
    },
    {
      id: '9',
      orderDetails: 'Проект 9',
      orderDate: subDays(new Date(), 11).getTime(),
      status: 'completed',
      orderID: 'Снимка',
      amountCrypto: 'Документи'
    },
    {
      id: '10',
      orderDetails: 'Проект 10',
      orderDate: subDays(new Date(), 123).getTime(),
      status: 'failed',
      orderID: 'Снимка',
      amountCrypto: 'Документи'
    }
  ];

  return (
    <Card>
      <ProjectsTable cryptoOrders={cryptoOrders} />
    </Card>
  );
}

export default Projects;
