'use client';

import { useState } from 'react';
import UsernameField from './form/UsernameField';
import PasswordField from './form/PasswordField';
import RememberMeCheckbox from './form/RememberMeCheckbox';
import SubmitButton from './form/SubmitButton';
import ErrorMessage from './form/ErrorMessage';

interface LoginFormProps {
  onLogin: (username: string, password: string) => Promise<{ success: boolean; message?: string }>;
}

export default function LoginForm({ onLogin }: LoginFormProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (error) setError('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const result = await onLogin(formData.username, formData.password);

      if (!result.success) {
        setError(result.message || 'خطا در ورود');
      }
    } catch (err) {
      setError('خطا در ارتباط با سرور');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <ErrorMessage error={error} />

      <UsernameField
        value={formData.username}
        onChange={handleInputChange}
        disabled={isLoading}
      />

      <PasswordField
        value={formData.password}
        onChange={handleInputChange}
        disabled={isLoading}
        showPassword={showPassword}
        onTogglePassword={() => setShowPassword(!showPassword)}
      />

      <RememberMeCheckbox
        checked={rememberMe}
        onChange={setRememberMe}
        disabled={isLoading}
      />

      <SubmitButton isLoading={isLoading} />
    </form>
  );
}