using System.Security.Cryptography;
using System.Text;

namespace CRM.Repository
{

    public static class EncryptionHelper
    {
        private static readonly string Key = "d8fb81d433dd78dbb32f21f43c513484";

        public static string EncryptField(string value)
        {
            if (string.IsNullOrEmpty(value)) return value;

            using var aes = Aes.Create();
            aes.Key = Encoding.UTF8.GetBytes(Key);
            aes.IV = new byte[16];

            using var encryptor = aes.CreateEncryptor(aes.Key, aes.IV);
            using var ms = new MemoryStream();
            using var cs = new CryptoStream(ms, encryptor, CryptoStreamMode.Write);
            using (var writer = new StreamWriter(cs))
            {
                writer.Write(value);
            }
            return Convert.ToBase64String(ms.ToArray());
        }

        public static string DecryptField(string encryptedValue)
        {
            if (string.IsNullOrEmpty(encryptedValue)) return encryptedValue;

            using var aes = Aes.Create();
            aes.Key = Encoding.UTF8.GetBytes(Key);
            aes.IV = new byte[16];

            using var decryptor = aes.CreateDecryptor(aes.Key, aes.IV);
            using var ms = new MemoryStream(Convert.FromBase64String(encryptedValue));
            using var cs = new CryptoStream(ms, decryptor, CryptoStreamMode.Read);
            using var reader = new StreamReader(cs);
            return reader.ReadToEnd();
        }
    }
}