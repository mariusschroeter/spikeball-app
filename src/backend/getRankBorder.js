export const getRankBorder = (rank, division, setrankBorder) => {
  const rankBorders = {
    0: [
      "https://firebasestorage.googleapis.com/v0/b/spikeleague-36ea2.appspot.com/o/rank_0_1.png?alt=media&token=90e6fafc-867f-470e-b72a-1a25c5270684",
      "https://firebasestorage.googleapis.com/v0/b/spikeleague-36ea2.appspot.com/o/rank_0_2.png?alt=media&token=e11f7ef1-449a-409f-b2eb-a2943ac51004",
      "https://firebasestorage.googleapis.com/v0/b/spikeleague-36ea2.appspot.com/o/rank_0_3.png?alt=media&token=8b7ead20-4a31-466e-8857-6ec7598bca7e",
      "https://firebasestorage.googleapis.com/v0/b/spikeleague-36ea2.appspot.com/o/rank_0_4.png?alt=media&token=ac7a3e98-3890-4477-bab3-6a6906d80d31",
    ],
    1: [
      "https://firebasestorage.googleapis.com/v0/b/spikeleague-36ea2.appspot.com/o/rank_1_1.png?alt=media&token=00ceb3d3-298e-4f46-9a0a-417d1a712796",
      "https://firebasestorage.googleapis.com/v0/b/spikeleague-36ea2.appspot.com/o/rank_1_2.png?alt=media&token=ecdb1be5-f455-4bf0-b48a-87ea1c0017fb",
      "https://firebasestorage.googleapis.com/v0/b/spikeleague-36ea2.appspot.com/o/rank_1_3.png?alt=media&token=d332df4d-8af1-4b1d-b79e-aa13e11b59cb",
      "https://firebasestorage.googleapis.com/v0/b/spikeleague-36ea2.appspot.com/o/rank_1_4.png?alt=media&token=7ac63c53-3ff3-4e94-bee9-7d3d2ba20c9d",
    ],
    2: [
      "https://firebasestorage.googleapis.com/v0/b/spikeleague-36ea2.appspot.com/o/rank_2_1.png?alt=media&token=2a06a313-c5ec-4326-a539-83b0bd3bcc82",
      "https://firebasestorage.googleapis.com/v0/b/spikeleague-36ea2.appspot.com/o/rank_2_2.png?alt=media&token=b1b6a074-e9d3-4400-8f02-998320cb737e",
      "https://firebasestorage.googleapis.com/v0/b/spikeleague-36ea2.appspot.com/o/rank_2_3.png?alt=media&token=42a5b9bf-f07c-4af6-a496-295b6a8c7914",
      "https://firebasestorage.googleapis.com/v0/b/spikeleague-36ea2.appspot.com/o/rank_2_4.png?alt=media&token=e9d37a5f-cdc0-4e9c-8a2d-6b6e58539d6f",
    ],
    3: [
      "https://firebasestorage.googleapis.com/v0/b/spikeleague-36ea2.appspot.com/o/rank_3_1.png?alt=media&token=9dc3e2ee-9111-49af-ab3d-3467b66432fd",
      "https://firebasestorage.googleapis.com/v0/b/spikeleague-36ea2.appspot.com/o/rank_3_2.png?alt=media&token=ff1d4b31-cf8a-4cef-8ae9-b960e2e325a2",
      "https://firebasestorage.googleapis.com/v0/b/spikeleague-36ea2.appspot.com/o/rank_3_3.png?alt=media&token=d2ac147a-ae76-435c-9be3-9bcae7424c17",
      "https://firebasestorage.googleapis.com/v0/b/spikeleague-36ea2.appspot.com/o/rank_3_4.png?alt=media&token=5e143b0e-9dfa-45d7-b742-ddf5217b9432",
    ],
    4: [
      "https://firebasestorage.googleapis.com/v0/b/spikeleague-36ea2.appspot.com/o/rank_4_1.png?alt=media&token=5ff1f310-e528-4136-948c-11029b474797",
      "https://firebasestorage.googleapis.com/v0/b/spikeleague-36ea2.appspot.com/o/rank_4_2.png?alt=media&token=9ed7ec8e-74f1-49a2-a14b-4bf27962626b",
      "https://firebasestorage.googleapis.com/v0/b/spikeleague-36ea2.appspot.com/o/rank_4_3.png?alt=media&token=9100c1b9-f0e8-4ef1-b85e-fcba7641617b",
      "https://firebasestorage.googleapis.com/v0/b/spikeleague-36ea2.appspot.com/o/rank_4_4.png?alt=media&token=3f902a39-eb10-4e46-b837-713c4b8401c5",
    ],
    5: [
      "https://firebasestorage.googleapis.com/v0/b/spikeleague-36ea2.appspot.com/o/rank_5_1.png?alt=media&token=2cfa06de-1ae2-423e-a499-f0799370dc51",
      "https://firebasestorage.googleapis.com/v0/b/spikeleague-36ea2.appspot.com/o/rank_5_2.png?alt=media&token=45d05612-d006-4cfa-8582-2f418dd28455",
      "https://firebasestorage.googleapis.com/v0/b/spikeleague-36ea2.appspot.com/o/rank_5_3.png?alt=media&token=7093fa2b-a461-40e3-a8f3-834d7d997d1e",
      "https://firebasestorage.googleapis.com/v0/b/spikeleague-36ea2.appspot.com/o/rank_5_4.png?alt=media&token=05113c2d-7302-4ed2-bba3-342b6402dd0a",
    ],
  };
  setrankBorder(rankBorders[rank.toString()][division - 1]);
};
