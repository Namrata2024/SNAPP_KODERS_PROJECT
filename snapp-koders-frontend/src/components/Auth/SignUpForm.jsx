import React, { useState } from 'react';
import {
  Box,
  TextField,
  Button,
  Typography,
  MenuItem,
  Chip,
  Select,
  InputLabel,
  FormControl,
  OutlinedInput,
  IconButton,
  InputAdornment,
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const genderOptions = ['male', 'female', 'other'];
const incomeTypeOptions = ['daily', 'monthly', 'seasonal', 'other'];
const languageOptions = [
  'Hindi',
  'English',
  'Marathi',
  'Bengali',
  'Telugu',
  'Tamil',
  'Kannada',
  'Gujarati',
  'Urdu',
  'Other',
];
const digitalAccessOptions = [
  'None',
  'Feature phone',
  'Basic smartphone with UPI',
  'Smartphone with apps',
];

const optionalFields = [
  'expenses',
  'debtStatus',
  'digitalAccess',
  'cashVsDigital',
  'savingGoal',
];

const SignUpForm = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    username: '',
    password: '',
    name: '',
    age: '',
    gender: '',
    occupation: '',
    location: '',
    language: [],
    householdSize: '',
    education: '',
    incomeType: '',
    dailyIncome: '',
    monthlyIncome: '',
    expenses: [],
    debtStatus: '',
    digitalAccess: '',
    cashVsDigital: '',
    savingGoal: '',
  });

  const [showPassword, setShowPassword] = useState(false);

  const handleTogglePassword = () => {
    setShowPassword((prev) => !prev);
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleLanguageChange = (e) => {
    setForm({ ...form, language: e.target.value });
  };

  const handleExpensesChange = (e) => {
    const value = e.target.value;
    const expenses = value.split(',').map((item) => item.trim());
    setForm({ ...form, expenses });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate required fields
    for (const [key, value] of Object.entries(form)) {
      if (
        optionalFields.includes(key)
          ? false
          : value === '' ||
            value === null ||
            (Array.isArray(value) && value.length === 0)
      ) {
        alert(`Please fill in the "${key}" field.`);
        return;
      }
    }

    if (parseInt(form.age) < 18) {
      alert('You must be at least 18 years old.');
      return;
    }

    try {
      const res = await axios.post('http://localhost:8080/auth/signup', form, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('userId', res.data.userId);
      navigate('/home');
    } catch (err) {
      console.error('Signup failed:', err);
      alert('Signup failed. Please try again.');
    }
  };

  return (
    <Box p={2} display="flex" flexDirection="column" gap={2}>
      <Typography variant="h6">Sign Up</Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          name="username"
          label="Username"
          required
          fullWidth
          value={form.username}
          onChange={handleChange}
          sx={{ mb: 2 }}
        />

        <FormControl fullWidth required variant="outlined" sx={{ mb: 2 }}>
          <InputLabel htmlFor="password">Password</InputLabel>
          <OutlinedInput
            id="password"
            name="password"
            type={showPassword ? 'text' : 'password'}
            value={form.password}
            onChange={handleChange}
            endAdornment={
              <InputAdornment position="end">
                <IconButton onClick={handleTogglePassword} edge="end">
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
            label="Password"
          />
        </FormControl>

        <TextField
          name="name"
          label="Full Name"
          required
          fullWidth
          value={form.name}
          onChange={handleChange}
          sx={{ mb: 2 }}
        />
        <TextField
          name="age"
          label="Age"
          type="number"
          required
          fullWidth
          value={form.age}
          onChange={handleChange}
          sx={{ mb: 2 }}
        />
        <TextField
          name="gender"
          label="Gender"
          select
          required
          fullWidth
          value={form.gender}
          onChange={handleChange}
          sx={{ mb: 2 }}
        >
          {genderOptions.map((g) => (
            <MenuItem key={g} value={g}>
              {g}
            </MenuItem>
          ))}
        </TextField>
        <TextField
          name="occupation"
          label="Occupation"
          required
          fullWidth
          value={form.occupation}
          onChange={handleChange}
          sx={{ mb: 2 }}
        />
        <TextField
          name="location"
          label="Location"
          required
          fullWidth
          value={form.location}
          onChange={handleChange}
          sx={{ mb: 2 }}
        />
        <FormControl fullWidth required sx={{ mb: 2 }}>
          <InputLabel id="language-label">Languages Known</InputLabel>
          <Select
            labelId="language-label"
            multiple
            name="language"
            value={form.language}
            onChange={handleLanguageChange}
            input={<OutlinedInput label="Languages Known" />}
            renderValue={(selected) => (
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                {selected.map((value) => (
                  <Chip key={value} label={value} />
                ))}
              </Box>
            )}
          >
            {languageOptions.map((lang) => (
              <MenuItem key={lang} value={lang}>
                {lang}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <TextField
          name="householdSize"
          label="Household Size"
          type="number"
          required
          fullWidth
          value={form.householdSize}
          onChange={handleChange}
          sx={{ mb: 2 }}
        />
        <TextField
          name="education"
          label="Education"
          required
          fullWidth
          value={form.education}
          onChange={handleChange}
          sx={{ mb: 2 }}
        />
        <TextField
          name="incomeType"
          label="Income Type"
          select
          required
          fullWidth
          value={form.incomeType}
          onChange={handleChange}
          sx={{ mb: 2 }}
        >
          {incomeTypeOptions.map((i) => (
            <MenuItem key={i} value={i}>
              {i}
            </MenuItem>
          ))}
        </TextField>
        <TextField
          name="dailyIncome"
          label="Daily Income (₹)"
          type="number"
          required
          fullWidth
          value={form.dailyIncome}
          onChange={handleChange}
          sx={{ mb: 2 }}
        />
        <TextField
          name="monthlyIncome"
          label="Monthly Income (₹)"
          type="number"
          required
          fullWidth
          value={form.monthlyIncome}
          onChange={handleChange}
          sx={{ mb: 2 }}
        />
        <TextField
          name="expenses"
          label="Expenses (comma-separated)"
          fullWidth
          onChange={handleExpensesChange}
          placeholder="₹120 groceries, ₹80 transport"
          sx={{ mb: 2 }}
        />
        <TextField
          name="debtStatus"
          label="Debt Status"
          fullWidth
          value={form.debtStatus}
          onChange={handleChange}
          sx={{ mb: 2 }}
        />
        <TextField
          name="digitalAccess"
          label="Digital Access"
          select
          fullWidth
          value={form.digitalAccess}
          onChange={handleChange}
          sx={{ mb: 2 }}
        >
          {digitalAccessOptions.map((d) => (
            <MenuItem key={d} value={d}>
              {d}
            </MenuItem>
          ))}
        </TextField>
        <TextField
          name="cashVsDigital"
          label="Cash vs Digital (e.g. 70% cash, 30% digital)"
          fullWidth
          value={form.cashVsDigital}
          onChange={handleChange}
          sx={{ mb: 2 }}
        />
        <TextField
          name="savingGoal"
          label="Saving Goal"
          fullWidth
          value={form.savingGoal}
          onChange={handleChange}
          sx={{ mb: 2 }}
        />
        <Button type="submit" variant="contained" fullWidth sx={{ mt: 2 }}>
          Submit
        </Button>
      </form>
    </Box>
  );
};

export default SignUpForm;
