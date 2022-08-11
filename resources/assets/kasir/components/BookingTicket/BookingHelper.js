module.exports = {
  getStatus: (isVip, isDistributor, chosenDistributor) => {
    if (isVip)
      return 'vip_booked';
    else if (isDistributor && chosenDistributor)
      return 'distributor_booked';
    else return 'booked';
  }
}
