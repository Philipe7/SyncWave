const { Client } = require('ssh2');
const fs = require('fs');
const path = require('path');
const dotenv = require('dotenv');

dotenv.config();

const sftpConfig = {
  host: process.env.SFTP_HOST,
  port: process.env.SFTP_PORT || 22,
  username: process.env.SFTP_USER,
  password: process.env.SFTP_PASSWORD
};

class SFTPService {
  constructor() {
    this.client = new Client();
  }

  uploadFile(localPath, remotePath) {
    return new Promise((resolve, reject) => {
      this.client.on('ready', () => {
        this.client.sftp((err, sftp) => {
          if (err) reject(err);
          sftp.fastPut(localPath, remotePath, (err) => {
            this.client.end();
            if (err) reject(err);
            resolve('Upload realizado com sucesso');
          });
        });
      }).connect(sftpConfig);
    });
  }

  downloadFile(remotePath, localPath) {
    return new Promise((resolve, reject) => {
      this.client.on('ready', () => {
        this.client.sftp((err, sftp) => {
          if (err) reject(err);
          sftp.fastGet(remotePath, localPath, (err) => {
            this.client.end();
            if (err) reject(err);
            resolve('Download realizado com sucesso');
          });
        });
      }).connect(sftpConfig);
    });
  }
}

module.exports = new SFTPService();
