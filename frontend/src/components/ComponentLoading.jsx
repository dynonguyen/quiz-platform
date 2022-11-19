import { Flex, Spinner, Typography } from '@cads-ui/core';

function ComponentLoading({
  spinProps = {},
  flexProps = {},
  textProps = {},
  text = ''
}) {
  return (
    <Flex center direction="column" spacing={text ? 2 : 0} {...flexProps}>
      <Spinner size="large" {...spinProps} />
      {text && (
        <Typography color="text.secondary" {...textProps}>
          {text}
        </Typography>
      )}
    </Flex>
  );
}

export default ComponentLoading;
