const Slack = require('slack-node');
require('dotenv').config();

const sendToSlack = process.argv[2] === 'send';

const hostList = {
  21: [
    'Vinna',
    'Eve',
  ],

  22: [
    'Ze',
    'Oto ze',
  ]
};

const membersList = [
  'Rafa',
  'Matheus',
  'Eve',
  'João',
  'Torto',
  'Jonathan',
  'Moyle',
  'Pablo',
  'Vinna',
  'LG',
  'Tagliati',
  'Will',
  'Aline',
  'Ivan',
  'Andre',
  'Thays',
  'Fumes',
];

const excludeHosts = (hosts, members) =>
  members.filter(member => hosts.indexOf(member) === -1)

const getCurrentWeek = () => {
  const date = new Date();
  const onejan = new Date(date.getFullYear(), 0, 1);
  return Math.ceil((((date - onejan) / 86400000) + onejan.getDay() + 1) / 7);
}

const getHosts = (hostList, nextWeek) =>
  hostList[nextWeek ? getCurrentWeek() + 1 : getCurrentWeek()];

const sortDojo = (hostList, members) => {
  const hosts = getHosts(hostList);
  const membersOnly = excludeHosts(hosts, members).sort(() => 0.5 - Math.random());
  const group1 = membersOnly.splice(0, (membersOnly.length / 2));
  const group2 = membersOnly;

  return [group1, group2];
};

const sendDojoList = (dojoList, hostList) => {
  const hosts = getHosts(hostList);
  const group1 = dojoList[0].join('\n');
  const group2 = dojoList[1].join('\n');

  const nextHosts = getHosts(hostList, true);

  const slackMsg = `
Grupo de *${hosts[0]}* (17:00)
\`\`\`
${group1}\`\`\`

Grupo de *${hosts[1]}* (18:00)
\`\`\`
${group2}\`\`\`
${nextHosts !== undefined ? `Os hosts da próxima semana serão: ${nextHosts.join(' e ')}` : 'Não consegui encontrar hosts para a próxima semana. Acabou?'}
`;

  const slack = new Slack();
  if (sendToSlack) {
    slack.setWebhook(process.env.SLACK_URL);
    slack.webhook({
      text: slackMsg,
    }, (err, response) => {
    });
  }
};

const dojoList = sortDojo(hostList, membersList);
sendDojoList(dojoList, hostList);
