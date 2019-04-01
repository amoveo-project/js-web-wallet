import React, { Fragment, useState } from 'react';
import { Link } from '@reach/router';
import styled from 'styled-components';

import FaqContext from 'shared/contexts/FaqContext';
import ExternalLink from 'shared/components/ExternalLink';

import Faq from './components/Faq';

const ExtLink = styled(ExternalLink)`
  color: #fff;
`;
const ListUl = styled.ul``;
const ListOl = styled.ol``;
const ListLi = styled.li``;
const Mark = styled.mark`
  font-weight: 500;
  background: none;
  color: ${props => props.theme.color.yellow};
`;

const questionGroups = [
  {
    group: 'General',
    id: 1,
    items: [
      {
        question: 'How to create a wallet? ',
        answer: (
          <Fragment>
            <p>
              To create a wallet, visit{' '}
              <ExtLink to="https://myveowallet.com">myveowallet.com</ExtLink>{' '}
              and click ‘Create wallet’. The wallet will generate a unique
              12-word passphrase. Make sure to either download a .txt file with
              the passphrase or write it down. In both cases, your passphrase
              must be kept safe and no one should have access to it but you.
              This passphrase will be required for you to restore or re-open
              your wallet.
            </p>
            <p>
              Proceed by clicking ‘Create’ and you will be taken to your
              dashboard. You will see a long string of numbers and letters, this
              is your wallet’s address. You will need to share this address with
              a person who wants to send you VEO. In the top right corner you
              will see a gear icon. Click on it to download a .txt file with
              your private key. Your will need your private key to sign off for
              transactions and restore or re-open your wallet. Think of it as
              your password and never, under any circumstances share it with
              anyone, otherwise you will be putting your funds at serious risk.
            </p>
            <p>
              This is it, your wallet is created and you are ready to send,
              receive and safely store VEO. You can create as many wallets as
              you want.
            </p>
          </Fragment>
        ),
        id: 1,
      },
      {
        question: 'How to open/restore a wallet?',
        answer: (
          <Fragment>
            <p>
              For security reasons, every time you close the{' '}
              <ExtLink to="https://myveowallet.com">myveowallet.com</ExtLink>{' '}
              website, you will be automatically logged out of your wallet. To
              regain access to it, you will either need your passphrase or your
              private key. Simply click ‘Restore wallet’, select one of the two
              options and either type in, copy & paste or load your passphrase
              or private key from a file saved on your computer. Then, click
              ‘Restore wallet’ again and you will be taken back to your
              dashboard.
            </p>
          </Fragment>
        ),
        id: 2,
      },
      {
        question: 'How to send VEO?',
        answer: (
          <Fragment>
            <p>
              To send VEO to someone, log into your dashboard and click ‘Send’.
              Here, simply type in or select the amount of VEO you wish to send
              and paste the recipient’s wallet address. The transaction fee will
              appear on your screen, it will depend on the type of address
              you’re sending money to and can vary. Make sure to double-check
              the address before sending anything, as it will be impossible to
              get your money back after you click ‘Send’. Once you’ve made sure
              everything is correct, simply click ‘Send’. The transaction will
              appear on your and the recipient's dashboards as ‘Pending’.
            </p>
          </Fragment>
        ),
        id: 3,
      },
      {
        question: 'How to send VEO with Ledger?',
        answer: (
          <Fragment>
            <p>
              If you’re sending VEO with your Ledger device, the process remains
              the same, but after you click ‘Send’ you will be asked to sign
              transaction with your Ledger device. You will see the
              transaction’s details on your Ledger’s screen along with a message
              ‘Confirm transaction?’. Once you confirm the transaction on your
              device it will be sent. If you won’t confirm it, you will see the
              error message.
            </p>
          </Fragment>
        ),
        id: 4,
      },
      {
        question: 'How to receive VEO?',
        answer: (
          <Fragment>
            <p>
              To receive VEO, you will need to share your wallet’s address with
              whoever is sending it to you. There are two ways of doing so.
              Start by clicking ‘Receive’ on your dashboard. Here, you can
              simply copy your wallet’s address and send it to whoever is
              sending you money. Alternatively, at the bottom of the page you
              can generate a QR code which will contain the amount of VEO you’re
              expecting to receive. Once the transaction is sent to you, it will
              appear as ‘Pending’ on your dashboard, containing the time
              signature and the senders’ address.
            </p>
          </Fragment>
        ),
        id: 5,
      },
      {
        question: 'How long do VEO transactions take?',
        answer: (
          <Fragment>
            <p>
              Typically, it takes the network about 10 minutes to confirm a
              transaction. However, some recipients, such as cryptocurrency
              exchanges or payment providers, may choose to accept transactions
              after 3-5 confirmations. In those cases, it will take more time
              for the transaction to come through.
            </p>
          </Fragment>
        ),
        id: 6,
      },
      {
        question: 'What are VEO transaction fees?',
        answer: (
          <Fragment>
            <p>
              Amoveo transaction fees depend on the type of the address you’re
              sending VEO to and can vary. You will see the transaction fee on
              your screen before sending VEO. There are no transaction fees for
              receiving VEO.
            </p>
          </Fragment>
        ),
        id: 7,
      },
    ],
  },
  {
    group: 'Hardware wallet',
    id: 2,
    items: [
      {
        question: 'How to use Ledger Nano S with MyVeoWallet',
        answer: (
          <Fragment>
            <p>
              <ExtLink to="https://www.ledger.com/products/ledger-nano-s">
                Ledger Nano S
              </ExtLink>{' '}
              is a hardware wallet that protects user’s private keys with a
              secure chip locked by a PIN code, making it one of the most secure
              storage solutions available, even when transacting via an
              untrusted or infected computer.
            </p>
            <p>Before you start make sure:</p>
            <ListUl>
              <ListLi>
                Your Ledger device is{' '}
                <ExtLink to="https://support.ledger.com/hc/en-us/articles/360006395233">
                  initialised
                </ExtLink>{' '}
                and the latest version of{' '}
                <ExtLink to="https://support.ledger.com/hc/en-us/articles/360002731113">
                  firmware
                </ExtLink>{' '}
                is installed.
              </ListLi>
              <ListLi>
                The latest Amoveo app is installed on your device using Ledger
                Manager or Ledger Live.
              </ListLi>
              <ListLi>Your Ledger device is connected to your computer.</ListLi>
            </ListUl>
          </Fragment>
        ),
        id: 8,
      },
      {
        question:
          'How to Install Amoveo wallet app on your Ledger Nano S using Ledger Live',
        answer: (
          <Fragment>
            <ListOl>
              <ListLi>
                Navigate to <Mark>Manager</Mark> on Ledger Live.
              </ListLi>
              <ListLi>Connect and unlock your Ledger Nano S.</ListLi>
              <ListLi>
                Allow manager on your device by pressing the right button.
              </ListLi>
              <ListLi>Find Amoveo in the app catalog.</ListLi>
              <ListLi>
                Click the <Mark>Install</Mark> button, an installation window
                will appear.
              </ListLi>
              <ListLi>
                You should see <Mark>Processing…</Mark> on your device.{' '}
              </ListLi>
              <ListLi>The app installation is confirmed.</ListLi>
              <ListLi>
                You should see the app icon both on Ledger Live and on your
                device’s screen.
              </ListLi>
              {/*              <ListLi>
                A new wallet will be created for you. You will see your balance
                and recent transactions on the Amoveo account in Ledger Live.
              </ListLi> */}
            </ListOl>
          </Fragment>
        ),
        id: 9,
      },
      {
        question: 'Connect to Ledger device',
        answer: (
          <Fragment>
            <ListOl>
              <ListLi>Connect and unlock your Ledger device.</ListLi>
              <ListLi>Open Amoveo app.</ListLi>
              <ListLi>Open the desktop or web version of MyVeoWallet.</ListLi>
              <ListLi>
                Click <Mark>Use Hardware wallet</Mark>.
              </ListLi>
              <ListLi>
                You will be taken to the web wallet’s dashboard where you will
                see your account’s balance and your recent transactions.
              </ListLi>
            </ListOl>
          </Fragment>
        ),
        id: 10,
      },
      {
        question: 'How to send VEO with Ledger',
        answer: (
          <Fragment>
            <ListOl>
              <ListLi>Open MyVeoWallet.</ListLi>
              <ListLi>
                Click <Mark>Use Hardware Wallet</Mark>.
              </ListLi>
              <ListLi>Connect and unlock your Ledger device.</ListLi>
              <ListLi>Open Amoveo app.</ListLi>
              <ListLi>
                Fill in the transaction details in MyVeoWallet and click{' '}
                <Mark>Send</Mark>.
              </ListLi>
              <ListLi>
                Verify the transaction details on your Ledger device. If
                correct, press the <Mark>right button</Mark> to send.
              </ListLi>
            </ListOl>
          </Fragment>
        ),
        id: 11,
      },
      {
        question: 'How to receive VEO with Ledger',
        answer: (
          <Fragment>
            <ListOl>
              <ListLi>Open MyVeoWallet.</ListLi>
              <ListLi>
                Click <Mark>Use Hardware Wallet</Mark>.
              </ListLi>
              <ListLi>Connect and unlock your Ledger device.</ListLi>
              <ListLi>Open Amoveo app.</ListLi>
              <ListLi>
                In MyVeoWallet, click <Mark>Receive.</Mark>
              </ListLi>
              {/*              <ListLi>
                Click on <Mark>Verify</Mark> to generate a receive address on
                your device.
              </ListLi>
              <ListLi>
                Make sure that the address shown on your device’s screen is the
                same as shown in MyVeoWallet. If the addresses match, press the
                right button on your Ledger to continue.
              </ListLi> */}
              <ListLi>
                Click <Mark>Copy</Mark> to copy your address and send it to
                whoever is crediting your account.
              </ListLi>
            </ListOl>
          </Fragment>
        ),
        id: 12,
      },
      {
        question: 'Support',
        answer: (
          <Fragment>
            <p>
              If you’re experiencing issues with or have any questions about
              MyVeoWallet, contact our support on{' '}
              <ExtLink to="https://tlg.name/amoveo_wallet">Telegram</ExtLink>.
            </p>
          </Fragment>
        ),
        id: 13,
      },
    ],
  },
];

const FaqContainer = () => {
  const [openedQuestions, setOpenedQuestions] = useState([1]);

  function handleToggleQuestion(questionId) {
    const arr = openedQuestions.includes(questionId)
      ? openedQuestions.filter(id => id !== questionId)
      : [questionId];

    setOpenedQuestions(arr);
  }

  const faqState = {
    handleToggleQuestion,
    openedQuestions,
  };

  return (
    <FaqContext.Provider value={faqState}>
      <Faq questionGroups={questionGroups} />
    </FaqContext.Provider>
  );
};

export default FaqContainer;
