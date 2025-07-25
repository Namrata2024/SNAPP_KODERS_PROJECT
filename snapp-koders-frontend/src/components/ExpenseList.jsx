import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Box,
  Button,
  Card,
  CardContent,
  Dialog,
  DialogContent,
  DialogTitle,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import { PieChart } from '@mui/x-charts/PieChart';
import SpeechToTextExpense from './SpeechToTextExpense';

export default function ExpenseList() {
  const [expenses, setExpenses] = useState([]);
  const [grouped, setGrouped] = useState({});
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [open, setOpen] = useState(false);
  const [showAddExpense, setShowAddExpense] = useState(false);

  const fetchExpenses = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/expenses');
      const expenses = res.data;
      setExpenses(expenses);
      const groupedData = expenses.reduce((acc, curr) => {
        if (
          !curr ||
          typeof curr !== 'object' ||
          typeof curr.amount !== 'number' ||
          isNaN(curr.amount)
        ) {
          return acc;
        }
        const cat = curr.category;
        if (!acc[cat]) {
          acc[cat] = { total: 0, items: [] };
        }
        acc[cat].total += curr.amount;
        acc[cat].items.push(curr);
        return acc;
      }, {});
      setGrouped(groupedData);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchExpenses();
  }, []);

  const handleClickOpen = (category) => {
    setSelectedCategory(category);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const toggleAddExpense = () => {
    setShowAddExpense((prev) => !prev);
  };

  return (
    <Box sx={{ padding: 3 }}>
      <Card sx={{ maxWidth: 800, margin: 'auto', marginBottom: 3 }}>
        <CardContent>
          <Typography
            variant="h5"
            component="div"
            sx={{ textAlign: 'center', fontWeight: 600, marginBottom: 2 }}
          >
            Expense Distribution
          </Typography>
          <Button
            variant="contained"
            onClick={toggleAddExpense}
            sx={{ marginBottom: 2 }}
          >
            {showAddExpense ? 'Done' : 'Add Expense'}
          </Button>
          {showAddExpense && (
            <SpeechToTextExpense fetchExpenses={fetchExpenses} />
          )}
          <PieChart
            series={[
              {
                data: Object.entries(grouped).map(([category, data]) => ({
                  id: category,
                  label: category,
                  value: data.total,
                })),
              },
            ]}
            width={400}
            height={200}
          />
        </CardContent>
      </Card>

      <TableContainer component={Card} sx={{ maxWidth: 800, margin: 'auto' }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Category</TableCell>
              <TableCell>Total Amount</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {Object.entries(grouped).map(([category, data]) => (
              <TableRow key={category}>
                <TableCell>{category}</TableCell>
                <TableCell>₹{data.total.toFixed(2)}</TableCell>
                <TableCell>
                  <Button
                    variant="outlined"
                    onClick={() => handleClickOpen(category)}
                  >
                    View Details
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{selectedCategory} Details</DialogTitle>
        <DialogContent>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Title</TableCell>
                <TableCell>Amount</TableCell>
                <TableCell>Date</TableCell>
                <TableCell>Comments</TableCell>
                <TableCell>Payment Method</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {selectedCategory &&
                grouped[selectedCategory]?.items.map((item) => (
                  <TableRow key={item._id}>
                    <TableCell>{item.title}</TableCell>
                    <TableCell>₹{item.amount}</TableCell>

                    <TableCell>
                      {new Date(item.date).toLocaleDateString()}
                    </TableCell>
                    <TableCell>{item.note}</TableCell>
                    <TableCell>{item.paymentMethod}</TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </DialogContent>
      </Dialog>
    </Box>
  );
}
